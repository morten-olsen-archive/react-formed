module.exports = function (w) {

  return {
    files: [
      'src/**/*.js',
      'test/setup.js',
    ],

    tests: [
      'test/*.spec.js'
    ],

    compilers: {
      '**/*.js': w.compilers.babel()
    },

    testFramework: 'mocha',

    env: {
      type: 'node'
    },

    setup: function () {
      require('babel-polyfill');
      require('jsdom-global/register');
      require('./test/setup');
    }
  };
};
