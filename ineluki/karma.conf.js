//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'components/**/*.js',
    ],

    singleRun: true,
    autoWatch: false,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
