var JSHint = require('jshint')
  , _ = require('underscore')
  , fs = require('fs')
  , path = require('path')
  , util = require('util')
  , BusterGlob = require('buster-glob')
  , events = require('events')
  , debug = require('debug')('Lint')
  , colors = require('colors')
  , pluralize = require('pluralize');

module.exports = Lint;

function Lint() {
  Lint.super_.call(this);
  this.results = [];
  this.count = 0;
}

util.inherits(Lint, events.EventEmitter);

Lint.prototype.globs = function (globs, jshintSettings, options) {
  var self = this;
  options = _.defaults(options || {}, {colorMode: 'console'});

  debug("globs: %s", globs.join(" "));
  debug("JSHint Settings: %j", jshintSettings);
  debug("options: %j", options);

  colors.mode = options.colorMode;

  globs = _.uniq(globs);

  console.log("linting %s...".blue, globs.join(" "));

  BusterGlob.glob(globs, function (err, files) {
    _.each(files, function (file) {
      self.file(file, jshintSettings);
    });

    self.emit("done");
  });
};

Lint.prototype.file = function (filepath, jshintSettings) {
  if (fs.lstatSync(filepath).isFile()) {
    debug("processing file: %s", filepath);
    var file = fs.readFileSync(filepath, 'utf-8');

    var self = this;

    if (!JSHint.JSHINT(file, jshintSettings || {})) {
      _.each(JSHint.JSHINT.errors, function (error) {
        if (error) {
          self.results.push({
            file: filepath,
            error: error
          });
        }
      });
    }

    this.count++;
  }
};

Lint.prototype.hasErrors = function () {
  return this.results.length > 0;
};

Lint.prototype.report = function () {
  var report = [];

  if (this.results.length === 0) {
    report.push(util.format("SUCCESS: Lint Free! (%d %s)".green, this.count, pluralize('file', this.count)));
  } else {
    var lastFile = this.results[0].file;
    var fileErrorCount = 1;

    _.each(this.results, function (result) {
      if (lastFile !== result.file) {
        report.push("");
        lastFile = result.file;
        fileErrorCount++;
      }

      var filePath = path.relative(process.cwd(), result.file);
      report.push(util.format("%s: line %d, col %d, %s", filePath.blue, result.error.line, result.error.character, result.error.reason.red));
    });

    report.push(util.format("\n%d %s in %d of %d %s".red,
      this.results.length,
      pluralize('error', this.results.length),
      fileErrorCount,
      this.count,
      pluralize('file', this.count)
    ));
  }

  return report;
};






