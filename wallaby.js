/** @format */

module.exports = (w) => ({
  files: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'test/setup.js',
  ],

  tests: [
    'test/*.spec.jsx',
    'test/*.spec.tsx',
  ],

  compilers: {
    '**/*.js': w.compilers.babel(),
    '**/*.jsx': w.compilers.babel(),
    '**/*.ts': w.compilers.babel(),
    '**/*.tsx': w.compilers.babel(),
  },

  testFramework: 'jest',

  env: {
    type: 'node',
  },

  setup: () => {
    require('@babel/polyfill'); // eslint-disable-line
    require('jsdom-global/register'); // eslint-disable-line
    require('./test/setup'); // eslint-disable-line
  },
});
