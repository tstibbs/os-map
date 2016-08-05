QUnit.config.autostart = false;

//list of tests
var testModules = [
	"src/mouseposition_osgb_test.js",
	"src/screenposition_osgb_test.js",
	"src/points_test.js"
];

// Resolve all testModules and then start the Test Runner.
requirejs(testModules, function(){
	QUnit.load();
	QUnit.start();
});
