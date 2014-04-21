node-lintall
===========

Utility to easily JSHint all JavaScript files in your project

## Installation
```javascript
npm install -g lintall
```

## Usage

### Setup Project
1. Place a `.jshintrc` file in the root of your project with your preferred settings
2. Place a `.lintallrc` file in the root with a space delimited list of globs

*Example .lintallrc file:*

`bin/main.js lib/**/*.js config/*.js`

* `bin/main.js`: Only main.js in the bin directory
* `lib/**/*.js`: All js files in the lib directory as well as all sub-directories
* `config/*js`: All js files in the config directory

### CLI
```javascript
lintall
```

With no colors in the output: `lintall -c none`

## Git Pre-Commit Hook

Example `.git/hooks/pre-commit` file:

```
#!/bin/sh
set -e
set -x
/usr/local/bin/node /usr/local/bin/lintall -c none
```

## Test
```
mocha
```

Coverage:
```
npm run-script coverage
open coverage/lcov-report/index.html
```

## License
MIT

