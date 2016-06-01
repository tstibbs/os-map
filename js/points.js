define(["proj4", "leaflet", "os_map", "conversion"],
    function(proj4, leaflet, os_map, conversion) {
	
		var icon = L.icon({
			iconUrl: 'img/trig.png',
			iconSize: [52, 84],
			iconAnchor: [22, 83], // point of the icon which will correspond to marker's location
			popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
		});
	
        return function (eastings, northings) {
            var out = conversion.osgbToLatLng(eastings, northings);
            var lng = out[0];
            var lat = out[1];
            leaflet.marker([lat, lng], {icon: icon}).addTo(os_map.getMap());
        }
    }
);
