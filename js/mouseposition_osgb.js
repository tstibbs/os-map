define(["leaflet_mouseposition", "conversion"],
	function(Leaflet_MousePosition, conversion) {
		return function(options) {
			if (options == null) {
				options = {};
			}
			options.latLngFormatter = function (lat, lng) {
				return conversion.latLngToGridRef(lat, lng);
			};
			
			return new Leaflet_MousePosition(options);
		};
	}
);
