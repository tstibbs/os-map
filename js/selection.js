define(["leaflet_boxSelector", "leaflet_boxSelector_Gpx"],
	function(Leaflet_boxSelector, leaflet_boxSelector_Gpx) {
		return Leaflet_boxSelector.extend({
			options: {
				actions: {
					gpx: {
						display: "Export to GPX file",
						action: leaflet_boxSelector_Gpx("trigs.gpx")
					}
				}
			}
		});
	}
);
