define(['jquery', 'error_handler'],
    function($, error_handler) {
		QUnit.module('error_handler', function() {
		
			function runTest(assert, caller, expected) {
				//set up
				var $container = $('<div id="error-container"></div>');
				$('#qunit-fixture').append($container);
				//run test
				caller();
				//verify
				assert.equal(expected, $container.text());
			}
		
			QUnit.test('console.log', function(assert) {
				runTest(assert, function () {
					console.log('blah');
				}, 'blah');
			});
			QUnit.test('console.log - multi args', function(assert) {
				runTest(assert, function () {
					console.log('blah', 'thing', 124, 'stuff');
				}, 'blah | thing | 124 | stuff');
			});
			QUnit.test('console.error', function(assert) {
				runTest(assert, function () {
					console.error('blah');
				}, 'blah');
			});
			QUnit.test('console.warn', function(assert) {
				runTest(assert, function () {
					console.warn('blah');
				}, 'blah');
			});
			QUnit.test('window.onerror', function(assert) {
				runTest(assert, function () {
					//can't just throw an error here as that would break the unit test itself.
					window.onerror('blah', 'thingf', 0, 0, 'stuffe');
				}, 'blah | thingf | stuffe');
			});
		});
	}
);
