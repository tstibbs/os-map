var baseConfig = require('./karma.conf.js')

var browsers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '35'
  }
};

module.exports = function(config) {
  baseConfig(config);
  config.set({
	reporters: ['saucelabs', 'progress'],
	
	preprocessors: {},

	sauceLabs: {
		public: 'public',
	},

	browsers: Object.keys(browsers),

	customLaunchers: browsers
  });
};
