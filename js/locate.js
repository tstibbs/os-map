define(["leaflet_locate"],
    function(leaflet_locate) {
        return function(options) {
			if (options == null) {
				options = {};
			}
			options.keepCurrentZoomLevel = true;
			options.setView = 'once';

			return L.control.locate(options); // can't get shim to work right now
        };
    }
);
