define(["leaflet", "leaflet_cluster", "leaflet_subgroup", "leaflet_matrixlayers"],
    function(leaflet, leaflet_cluster, leaflet_subgroup, leaflet_matrixlayers) {
	
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
		};
	
		var Points = leaflet.Class.extend({
			initialize: function (map, config) {
				this._markerList = null;
				this._map = map;
				this._config = config;
			},

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
				
				if (this._config.dimensional_layering) {
					if (this._markerList == null) {
						this._markerList = {};
					}
					var markersByType = this._markerList[type];
					if (markersByType == null) {
						this._markerList[type] = {};
						markersByType = this._markerList[type];
					}
					var markersByCondition = markersByType[condition];
					if (markersByCondition == null) {
						markersByType[condition] = [];
						markersByCondition = markersByType[condition];
					}
					markersByCondition.push(marker);
				} else {
					if (this._markerList == null) {
						this._markerList = [];
					}
					this._markerList.push(marker);
				}
			},
			
			finish: function (finished) {
				var parentGroup = null;
				if (this._config.cluster) {
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
				
				parentGroup.addTo(this._map);
				if (!this._config.dimensional_layering) {
					if (this._config.cluster) {
						parentGroup.addLayers(this._markerList);
					} else {
						for (var i = 0; i < this._markerList.length; i++) {
							parentGroup.addLayer(this._markerList[i]);	
						}
					}
				} else {
					//grouped
					var matrixOverlays = {};
					Object.keys(this._markerList).forEach(function (type) {
						var conditions = this._markerList[type];
						Object.keys(conditions).forEach(function (condition) { 
							var arrayOfMarkers = conditions[condition];
							var subGroup = leaflet.featureGroup.subGroup(parentGroup, arrayOfMarkers);
							//don't add to the map yet - let the layer control do that if it thinks it needs to - otherwise we could add all layers then immediately try to remove them all, which can cause UI weirdness
							matrixOverlays[type + '/' + condition] = subGroup;
						}, this);
					}, this);
					var control = leaflet_matrixlayers(null, null, matrixOverlays, {dimensionNames: ['Type', 'Condition'], loadingImage: '../img/loading.gif'});
					control.addTo(this._map);
				}
			}
		});

        return Points;
    }
);
