define(["proj4", "leaflet", "os_map", "conversion"],
    function(proj4, leaflet, os_map, conversion) {
	
		var icon = leaflet.icon({
			iconUrl: 'img/trig.png',
			iconAnchor: [10, 40], // point of the icon which will correspond to marker's location
			popupAnchor: [1, -38] // point from which the popup should open relative to the iconAnchor
		});
	
        return function (eastings, northings, url, name) {
            var out = conversion.osgbToLngLat(eastings, northings);
            var lng = out[0];
            var lat = out[1];
            var marker = leaflet.marker([lat, lng], {icon: icon});
			if (name == null) {
				name = url;
			}
			if (url != null) {
				marker.bindPopup('<a href="' + url + '">' + name + '</a>');
			} else if (name != null) {
				marker.bindPopup('<span>' + name + '</span>');
			}
			
			marker.addTo(os_map.getMap());
        }
    }
);
