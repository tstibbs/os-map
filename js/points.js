define(["proj4", "leaflet", "os_map", "leaflet_cluster", "leaflet_subgroup", "leaflet_matrixlayers", "config"],
    function(proj4, leaflet, os_map, leaflet_cluster, leaflet_subgroup, leaflet_matrixlayers, config) {
	
		var icons = {
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

		var markerList = null;
        return {
			add: function (lngLat, url, name, extraText, type, condition) {
				var lng = lngLat[0];
				var lat = lngLat[1];
				var markerOptions = {};
				if (icons[type] !== undefined) {
					markerOptions.icon = icons[type];
				}
				var marker = leaflet.marker([lat, lng], markerOptions);
				if (name == null) {
					name = url;
				}
				var popupText = "";
				if (url != null) {
					popupText = '<a href="' + url + '">' + name + '</a>';
				} else if (name != null) {
					popupText = '<span>' + name + '</span>';
				}
				if (popupText.length > 0) {
					popupText = popupText + '<br />';
				}
				if (extraText != null) {
					popupText = popupText + extraText;
				}
				marker.bindPopup(popupText);
				
				if (config.dimensional_layering) {
					if (markerList == null) {
						markerList = {};
					}
					if (markerList[type] == null) {
						markerList[type] = {};
					}
					if (markerList[type][condition] == null) {
						markerList[type][condition] = new Array();
					}
					markerList[type][condition].push(marker);
				} else {
					if (markerList == null) {
						markerList = [];
					}
					markerList.push(marker);
				}
			},
			finish: function (finished) {
				var map = os_map.getMap();
				
				var parentGroup = null;
				if (config.cluster) {
					parentGroup = leaflet_cluster({
						chunkedLoading: true,
						chunkProgress: function (processed, total, elapsed, layersArray) {
							if (processed === total) {
								finished();
							}
						}
					});
				} else {
					parentGroup = leaflet.layerGroup();
					finished();
				}
				
				parentGroup.addTo(map);
				if (!config.dimensional_layering) {
					if (config.cluster) {
						parentGroup.addLayers(markerList);
					} else {
						for (var i = 0; i < markerList.length; i++) {
							parentGroup.addLayer(markerList[i]);	
						}
					}
					map.addLayer(parentGroup);
				} else {
					//grouped
					var control = leaflet_matrixlayers(null, null, {dimensionNames: ['Type', 'Condition']});
					Object.keys(markerList).forEach(function (type) {
						var conditions = markerList[type];
						Object.keys(conditions).forEach(function (condition) { 
							var arrayOfMarkers = conditions[condition];
							//sub group through require js seems not to work for reasons I haven't looked into yet
							var subGroup = leaflet.featureGroup.subGroup(parentGroup, arrayOfMarkers);
							subGroup.addTo(map);
							control.addMatrixOverlay(subGroup, type + '/' + condition);
						});
					});
					control.addTo(map);
				}
			}
		};
    }
);
