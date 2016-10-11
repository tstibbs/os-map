define(["conversion"],
	function(conversion) {
		QUnit.module('conversion', function() {
			QUnit.test('latLngToGridRef - should return actual grid refs', function (assert) {
				assert.equal(conversion.latLngToGridRef(52.657977, 1.716038), 'TG 51408 13177');
			});

			QUnit.test('osgbToLngLat - should work for valid OSBGs', function (assert) {
				var actualValue = conversion.osgbToLngLat(651409, 313177);// array is long, lat
				assert.equal(actualValue.length, 2);
				assertBetween(assert, actualValue[0], 1.7160384428258, 1.7160384428259);
				assertBetween(assert, actualValue[1], 52.657976601295, 52.657976601296);
			});

			QUnit.test('gridRefToOsgb - should work for valid grid refs', function (assert) {
				assert.deepEqual(conversion.gridRefToOsgb('TG 51408 13177'), [651408, 313177]); // array is long, lat
			});

			QUnit.test('gridRefToLngLat - should work for valid grid refs', function (assert) {				
				var actualValue = conversion.gridRefToLngLat('TG 51408 13177');// array is long, lat
				assert.equal(actualValue.length, 2);
				assertBetween(assert, actualValue[0], 1.71602369010800, 1.71602369010801);
				assertBetween(assert, actualValue[1], 52.657977064472, 52.657977064473);
				
			});
		});
		
		// The exact results seem to change slightly from browser to browser, and even between different versions of node.
		// However, the 5th decimal place is about 1 metre at our latitude/longitude, so we _really_ don't need to care about small differences
		function assertBetween(assert, actual, lower, upper) {
			assert.ok(actual >= lower, actual + " should be >= " + lower);
			assert.ok(actual <= upper, actual + " should be <= " + upper);
		}
	}
);
