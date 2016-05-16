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
			conversion(52.657977, 1.716038).should.equal('TG 51408 13177');
		});
    });
});
