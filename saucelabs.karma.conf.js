var baseConfig = require('./karma.conf.js')

//browser
var chrome = 'chrome';
var firefox = 'firefox';
var ie = 'internet explorer';
var edge = 'MicrosoftEdge';
var opera = 'opera';
var safari = 'safari';
var safari_iphone = 'Safari';
var android_browser = 'Browser';
//OS
var win7 = 'Windows 7';
var win10 = 'Windows 10';
var linux = 'Linux';
var osx = 'OS X 10.11';

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

var extraBrowsers = {
  sl_edge: {
    base: 'SauceLabs',
    browserName: edge,
    platform: win10,
    version: '13'
  },
  sl_win7_safari: {
    base: 'SauceLabs',
    browserName: safari,
    platform: win7,
    version: '5.1'
  },
  //there is a problem with opera causing requirejs to time out, so commenting out until I have chance to look into it further
  //sl_opera: {
  //  base: 'SauceLabs',
  //  browserName: opera,
  //  platform: win7,
  //  version: '12.12'
  //},
  sl_linux_chrome: {
    base: 'SauceLabs',
    browserName: chrome,
    platform: linux,
    version: '48'
  },
  sl_osx_safari: {
    base: 'SauceLabs',
    browserName: safari,
    platform: osx,
    version: '9'
  },
  sl_osx_chrome: {
    base: 'SauceLabs',
    browserName: chrome,
    platform: osx,
    version: '51'
  }
};

var mobileBrowsers = {
  sl_iphone6: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPhone 6 Simulator',
    deviceOrientation: 'portrait',
    platformVersion: '9.3',
    platformName: 'iOS'
  },
  sl_iphone4s: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPhone 4s Simulator',
    deviceOrientation: 'portrait',
    platformVersion: '9.3',
    platformName: 'iOS'
  },
  sl_ipad: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPad Simulator',
    deviceOrientation: 'portrait',
    platformVersion: '9.3',
    platformName: 'iOS'
  },
  sl_s4: {
    base: 'SauceLabs',
    browserName: 'Browser',
    deviceName: 'Samsung Galaxy S4 Emulator',
    deviceOrientation: 'portrait',
    platformVersion: '4.4',
    platformName: 'Android'
  },
  sl_android51: {
    base: 'SauceLabs',
    browserName: 'Browser',
    deviceName: 'Android Emulator',
    deviceType: 'tablet',
    deviceOrientation: 'portrait',
    platformVersion: '5.1',
    platformName: 'Android'
  }
}

//if doing an extended test
for (var browser in extraBrowsers) { browsers[browser] = extraBrowsers[browser]; }
//if doing a mobile test
//for (var browser in mobileBrowsers) { browsers[browser] = mobileBrowsers[browser]; }

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
