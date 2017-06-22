'use strict';

module.exports = [
  {
    name: 'string with inline comment like substring',
    value: '// inline comment like substring',
    serialized: '\'// inline comment like substring\''
  },
  {
    name: 'string with block comment like substring',
    value: '/* block comment like substring */',
    serialized: '\'/* block comment like substring */\''
  },
  {
    name: 'string with number inside',
    value: '0.5',
    serialized: '\'0.5\''
  }
];
