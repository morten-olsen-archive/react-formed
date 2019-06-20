/** @format */

module.exports = (w) => ({
  files: ['src/**/*.js', 'src/**/*.jsx', 'test/setup.js'],

  tests: ['test/*.spec.jsx'],

  compilers: {
    '**/*.js': w.compilers.babel(),
    '**/*.jsx': w.compilers.babel(),
  },

  testFramework: 'mocha',

  env: {
    type: 'node',
  },

  setup: () => {
    require('@babel/polyfill'); // eslint-disable-line
    require('jsdom-global/register'); // eslint-disable-line
    require('./test/setup'); // eslint-disable-line
  },
});
