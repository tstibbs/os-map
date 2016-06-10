define(["leaflet_screenposition", "conversion"],
    function(leaflet_screenposition, conversion) {
        return function() {
			return leaflet_screenposition({
				onMove: true,
				icon: false,
				latLngFormatter: function (lat, lng) {
					return conversion.latLngToGridRef(lat, lng);
				}
			});
        }
    }
);
