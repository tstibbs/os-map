//list of tests
var testFiles = [
	"mouseposition_osgb_test.js",
	"screenposition_osgb_test.js",
	"points_test.js",
	"conversion_test.js",
	"mobile_test.js",
	"params_test.js",
	"config_test.js",
	"os_map_test.js"
];

requirejs.config({
    paths: {
        Squire: "https://npmcdn.com/squirejs@0.2.1/src/Squire",
        sinon: "https://npmcdn.com/sinon@1.17.5/pkg/sinon"
    },
    shim: {
        sinon: {
            exports: 'sinon'
        }
    }
});

if (window.__karma__ == undefined) {
	//we've just opened a qunit page locally for dev purposes
	setupNonKarma();
} else {
	//we're running karma as part of the build
	setupKarma();
}

function setupNonKarma() {
	QUnit.config.autostart = false;

	var tests = [];
	var tests = testFiles.map(function (testFile) { 
		return '../' + testFile;
	})

	// Resolve all testModules and then start the Test Runner.
	requirejs(tests, function(){
		QUnit.load();
		QUnit.start();
	});
}

function setupKarma() {

	//hacking in some stuff that would be useful in phantom js
	if (String.prototype.endsWith === undefined) {
		String.prototype.endsWith = function(suffix) {
			return this.indexOf(suffix, this.length - suffix.length) !== -1;
		};
	}

	var tests = [];
	var tests = testFiles.map(function (testFile) { 
		return '/base/test/' + testFile;
	});

	requirejs.config({
		baseUrl: '/base/js',

		//load our tests
		deps: tests,

		//kick off tests only once requirejs has finished, but only once
		callback: function() {
			if (window.KARMA_TESTS_STARTED === true) {
				return;
			} else {
				window.KARMA_TESTS_STARTED = true;
				window.__karma__.start();
			}
		}
	});
}
