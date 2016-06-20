require('should');
var requirejs = require("requirejs");
requirejs.config({
    baseUrl: 'js',
    nodeRequire: require
});

describe('conversion', function() {

	var conversion = requirejs('conversion');

	describe('latLngToGridRef', function () {
		it('should return actual grid refs', function() {
			conversion.latLngToGridRef(52.657977, 1.716038).should.equal('TG 51408 13177');
		});
    });

	describe('osgbToLngLat', function () {
		it('should work for valid OSBGs', function() {
			conversion.osgbToLngLat(651409, 313177).should.deepEqual([1.716038442825891, 52.65797660129558]); // array is long, lat
		});
    });

	describe('gridRefToOsgb', function () {
		it('should work for valid grid refs', function() {
			conversion.gridRefToOsgb('TG 51408 13177').should.deepEqual([651408, 313177]); // array is long, lat
		});
    });

	describe('gridRefToLngLat', function () {
		it('should work for valid grid refs', function() {
			conversion.gridRefToLngLat('TG 51408 13177').should.deepEqual([1.7160236901080013, 52.657977064472796]); // array is long, lat
		});
    });
});
