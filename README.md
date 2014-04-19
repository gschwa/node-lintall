node-linter
===========

Utility to easily JSHint all JavaScript files in your project

## Installation
```javascript
npm install -g linter
```

## Usage

### Setup Project
1. Place a `.jshintrc` file in the root of your project with your preferred settings
2. Place a `.linterrc` file in the root with a space delimited list of globs

*Example .linterrc:*
`bin/linter lib/**/*.js controllers/**/*.js`

### Run
```javascript
linter
```

