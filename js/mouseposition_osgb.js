define(["leaflet_mouseposition", "proj4", "conversion"],
    function(leaflet_mouseposition, proj4, conversion) {
        return function(options) {
			if (options == undefined || options == null) {
				options = {};
			}
			options.latLngFormatter = function (lat, lng) {
				return conversion(lat, lng);
			}
			
			return leaflet_mouseposition(options);
        }
    }
);