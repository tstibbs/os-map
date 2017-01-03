//declare utility function outside of requirejs that will boot requirejs, so that we have minimal js in each html file
function loadOsMap(bundles, callback) {
	var modules = bundles.map(function(bundle) {
		return 'bundles/' + bundle
	});
	
	var deps = ['main'];
	Array.prototype.push.apply(deps, modules);
	
	require([window.os_map_base + 'js/app'], function() {
		require(deps, function(main/*, bundles...*/) {
			var configBundles = {};
			for (var i = 1; i < arguments.length; i++) { //start at 1 as 0 will be 'main'
				configBundles[bundles[i-1]] = arguments[i];
			}
			callback(main, configBundles);
		});
	});
}
