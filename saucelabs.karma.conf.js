var baseConfig = require('./karma.conf.js')

var chrome = 'chrome';
var firefox = 'firefox';
var ie = 'internet explorer';
var win7 = 'Windows 7';

var browsers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: chrome,
    platform: win7,
    version: '51'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: firefox,
    platform: win7,
    version: '47'
  },
  sl_ie: {
    base: 'SauceLabs',
    browserName: ie,
    platform: win7,
    version: '11'
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
