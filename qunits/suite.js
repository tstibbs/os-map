//list of tests
var testFiles = [
	"src/mouseposition_osgb_test.js",
	"src/screenposition_osgb_test.js",
	"src/points_test.js"
];

if (window.__karma__ == undefined) {
	//we've just opened a qunit page locally for dev purposes
	setupNonKarma();
} else {
	//we're running karma as part of the build
	setupKarma();
}

function setupNonKarma() {
	QUnit.config.autostart = false;

	// Resolve all testModules and then start the Test Runner.
	requirejs(testFiles, function(){
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
	for (var i = 0; i < testFiles.length; i++) {
		tests[i] = '/base/qunits/' + testFiles[i];
	}

	requirejs.config({
		baseUrl: '/base/js',

		//load our tests
		deps: tests,

		//kick off tests only once requirejs has finished
		callback: window.__karma__.start
});
}
