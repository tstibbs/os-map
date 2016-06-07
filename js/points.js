define(["proj4", "leaflet", "os_map", "conversion"],
    function(proj4, leaflet, os_map, conversion) {
	
		var icon = leaflet.icon({
			iconUrl: 'img/trig.png',
			iconAnchor: [10, 40], // point of the icon which will correspond to marker's location
		});
	
        return function (eastings, northings) {
            var out = conversion.osgbToLatLng(eastings, northings);
            var lng = out[0];
            var lat = out[1];
            leaflet.marker([lat, lng], {icon: icon}).addTo(os_map.getMap());
        }
    }
);
