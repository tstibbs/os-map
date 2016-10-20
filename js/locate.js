define(["leaflet_locate"],
	function(leaflet_locate) {
		return L.Control.Locate.extend({
			options: {
				keepCurrentZoomLevel: true,
				setView: 'once'
			}
		});
	}
);
