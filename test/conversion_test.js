define(["conversion"],
    function(conversion) {
		QUnit.test('conversion - latLngToGridRef - should return actual grid refs', function (assert) {
			assert.equal(conversion.latLngToGridRef(52.657977, 1.716038), 'TG 51408 13177', "1");
		});

		QUnit.test('conversion - osgbToLngLat - should work for valid OSBGs', function (assert) {
			//the exact conversion seems to change slightly depending on the javscript runtime... but that level of detail won't matter so much, so just validate the range.
			var minExpectedValue = [1.71603844282589, 52.65797660129557];
			var maxExpectedValue = [1.716038442825891, 52.65797660129558];
			var actualValue = conversion.osgbToLngLat(651409, 313177);// array is long, lat
			assert.equal(actualValue.length, 2, "22");
			assert.ok(actualValue[0] >= minExpectedValue[0], actualValue[0] + " >= " + minExpectedValue[0]);
			assert.ok(actualValue[0] <= maxExpectedValue[0], actualValue[0] + " <= " + maxExpectedValue[0]);
			assert.ok(actualValue[1] >= minExpectedValue[1], actualValue[1] + " >= " + minExpectedValue[1]);
			assert.ok(actualValue[1] <= maxExpectedValue[1], actualValue[1] + " <= " + maxExpectedValue[1]);
		});

		QUnit.test('conversion - gridRefToOsgb - should work for valid grid refs', function (assert) {
			assert.deepEqual(conversion.gridRefToOsgb('TG 51408 13177'), [651408, 313177], "3"); // array is long, lat
		});

		QUnit.test('conversion - gridRefToLngLat - should work for valid grid refs', function (assert) {
			assert.deepEqual(conversion.gridRefToLngLat('TG 51408 13177'), [1.7160236901080013, 52.657977064472796], "4"); // array is long, lat
		});
	}
);
