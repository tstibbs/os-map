//declare utility function outside of requirejs that will boot requirejs, so that we have minimal js in each html file
function loadOsMap(bundles, callback) {
	var modules = bundles.map(function(bundle) {
		return 'configs/' + bundle
	});
	
	var deps = ['main'];
	Array.prototype.push.apply(deps, modules);
	
	require([window.os_map_base + 'js/app'], function() {
		require(deps, function(main/*, bundles...*/) {
			var args = Array.prototype.slice.call(arguments);
			var configBundles = args.length > 1 ? args.slice(1) : [];
			callback(main, configBundles);
		});
	});
}
