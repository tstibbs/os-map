define(["config"],
    function(Config) {
		QUnit.module('config', function() {
			QUnit.test('should inherit defaults', function(assert) {
				var config = new Config();
				assert.equal(true, config.cluster);
				assert.equal(false, config.dimensional_layering);
				assert.equal(undefined, config.blah);
				assert.notOk(config.hasOwnProperty('blah'));
			});
			QUnit.test('defaults can be overridden', function(assert) {
				var config = new Config({
					cluster: false,
					blah: 'stuff'
				});
				assert.equal(false, config.cluster);
				assert.equal(false, config.dimensional_layering);
				assert.equal('stuff', config.blah);
				assert.ok(config.hasOwnProperty('blah'));
			});
		});
	}
);
