define(["proj4", "leaflet", "os_map", "leaflet_cluster"],
    function(proj4, leaflet, os_map, leaflet_cluster) {
	
		var icon = leaflet.icon({
			iconUrl: 'img/trig.png',
			iconAnchor: [10, 40], // point of the icon which will correspond to marker's location
			popupAnchor: [1, -38] // point from which the popup should open relative to the iconAnchor
		});

		var markerList = [];
        return {
			add: function (lngLat, url, name) {
				var lng = lngLat[0];
				var lat = lngLat[1];
				var marker = leaflet.marker([lat, lng], {icon: icon});
				if (name == null) {
					name = url;
				}
				if (url != null) {
					marker.bindPopup('<a href="' + url + '">' + name + '</a>');
				} else if (name != null) {
					marker.bindPopup('<span>' + name + '</span>');
				}
				
				markerList.push(marker);
				// marker.addTo(os_map.getMap());
			},
			finish: function (finished) {
				var markers = leaflet_cluster({
					chunkedLoading: true,
					chunkProgress: function (processed, total, elapsed, layersArray) {
						if (processed === total) {
							finished();
						}
					}
				});
				markers.addLayers(markerList);
				os_map.getMap().addLayer(markers);
			}
		};
    }
);
