define(["leaflet_mouseposition", "conversion"],
	function(Leaflet_MousePosition, conversion) {
		return Leaflet_MousePosition.extend({
			options: {
				latLngFormatter: function (lat, lng) {
					return conversion.latLngToGridRef(lat, lng);
				}
			}
		});
	}
);
