define(['leaflet'], function(leaflet) {
	return {
		icons: {
			Pillar: leaflet.icon({
				iconUrl: window.os_map_base + 'img/pillar.png',
				iconAnchor: [10, 40], // point of the icon which will correspond to marker's location
				popupAnchor: [1, -38] // point from which the popup should open relative to the iconAnchor
			}),
			Bolt: leaflet.icon({
				iconUrl: window.os_map_base + 'img/bolt.png',
				iconAnchor: [11, 27],
				popupAnchor: [0, -23]
			}),
		}
	};
});
