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

*Example .lintallrc:*

`bin/lintall lib/**/*.js controllers/**/*.js`

### Run
```javascript
lintall
```

