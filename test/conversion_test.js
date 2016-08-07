define(["conversion"],
    function(conversion) {
		QUnit.test('conversion - latLngToGridRef - should return actual grid refs', function (assert) {
			assert.equal(conversion.latLngToGridRef(52.657977, 1.716038), 'TG 51408 13177');
		});

		QUnit.test('conversion - osgbToLngLat - should work for valid OSBGs', function (assert) {
			assert.deepEqual(conversion.osgbToLngLat(651409, 313177), [1.716038442825891, 52.65797660129557]); // array is long, lat
		});

		QUnit.test('conversion - gridRefToOsgb - should work for valid grid refs', function (assert) {
			assert.deepEqual(conversion.gridRefToOsgb('TG 51408 13177'), [651408, 313177]); // array is long, lat
		});

		QUnit.test('conversion - gridRefToLngLat - should work for valid grid refs', function (assert) {
			assert.deepEqual(conversion.gridRefToLngLat('TG 51408 13177'), [1.7160236901080013, 52.657977064472796]); // array is long, lat
		});
	}
);
