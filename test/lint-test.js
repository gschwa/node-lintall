var should = require('chai').should()
  , sinon = require('sinon')
  , BusterGlob = require('buster-glob')
  , fs = require('fs')
  , JSHint = require('jshint')
  , Lint = require('./../lib/lint');


var jshintSettings = {
  "predef": [

  ],

  "node" : true,
  "camelcase" : true,
  "indent" : 2,
  "boss" : false,
  "curly": false,
  "debug": false,
  "devel": false,
  "eqeqeq": true,
  "eqnull": false,
  "evil": true,
  "expr": true,
  "forin": false,
  "immed": false,
  "laxbreak": false,
  "laxcomma": true,
  "newcap": true,
  "noarg": true,
  "noempty": false,
  "nonew": false,
  "nomen": false,
  "onevar": false,
  "plusplus": false,
  "regexp": false,
  "strict": false,
  "sub": true,
  "undef": true,
  "white": true
};

describe("Lint", function () {

  var readFileStub;

  before(function () {
    sinon.stub(BusterGlob, "glob").yields(null, ["file1.js", "file2.js"]);
    sinon.stub(fs, "lstatSync", function () {
      return {
        isFile: function () { return true; }
      };
    });

    readFileStub = sinon.stub(fs, "readFileSync");
  });

  after(function () {
    readFileStub.restore();
  });

  it("should lint successfully", function (done) {

    readFileStub.withArgs("file1.js").returns('var a = 0;');
    readFileStub.withArgs("file2.js").returns('var b = 0;');

    var lint = new Lint();

    lint.on('done', function () {
      lint.report().should.have.length(1);
      done();
    });

    lint.globs(["test/index.js"], jshintSettings);
  });

  it("should lint with failures", function (done) {

    readFileStub.withArgs("file1.js").returns('var a = 5\nvar b = (a == 5);');
    readFileStub.withArgs("file2.js").returns('var b = 5;');

    var lint = new Lint();

    lint.on('done', function () {
      lint.report().should.have.length(3);
      lint.hasErrors().should.be.true;
      done();
    });

    lint.globs(["test/index.js"], jshintSettings);
  });
});