// Karma configuration

module.exports = function(config) {
  config.set({
    frameworks: ['requirejs', 'qunit'],

    files: [
        {pattern: 'js/**/*.js', included: false},
        {pattern: 'test/**/*.js', included: false},
        'js/app.js',
        'test/qunit_suite/suite.js',
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: { 'js/**/*.js': ['coverage'] },
    
	coverageReporter: {
		type : 'lcov',
		subdir: 'karma'
    },

    browsers: [/*'Chrome',*/ 'PhantomJS'],
  });
};
