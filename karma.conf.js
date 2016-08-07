// Karma configuration

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['requirejs', 'qunit'],

    files: [
        {pattern: 'js/**/*.js', included: false},
        {pattern: 'qunits/src/**/*.js', included: false},
        'js/app.js',
        'qunits/suite.js',
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: { 'js/**/*.js': ['coverage'] },
    
	coverageReporter: {
		type : 'lcov',
		subdir: 'karma'
    },
	
    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: [/*'Chrome',*/ 'PhantomJS'],

    captureTimeout: 60000,

    singleRun: true
  });
};
