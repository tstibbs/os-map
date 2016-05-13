require('should');
var requirejs = require("requirejs");
requirejs.config({
    baseUrl: 'js',
    nodeRequire: require
});

describe('conversion', function() {
	var conversion = requirejs('conversion');

	it('should return actual grid refs', function() {
		conversion(1, 1, 10).should.equal('SV 00001 00001');
	});
});
