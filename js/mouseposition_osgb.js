define(["leaflet_mouseposition", "conversion"],
    function(leaflet_mouseposition, conversion) {
        return function(options) {
			if (options == undefined || options == null) {
				options = {};
			}
			options.latLngFormatter = function (lat, lng) {
				return conversion.latLngToGridRef(lat, lng);
			}
			
			return leaflet_mouseposition(options);
        }
    }
);