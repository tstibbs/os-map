define(["leaflet", "leaflet_cluster", "leaflet_subgroup", "leaflet_matrixlayers", "points_model"],
    function(leaflet, leaflet_cluster, leaflet_subgroup, leaflet_matrixlayers, PointsModel) {
	
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
	
		var PointsView = leaflet.Class.extend({
			initialize: function (map, config, pointsModel) {
				this._markerList = null;
				this._map = map;
				this._config = config;
				this._model = pointsModel;
			},
			
			_translateMarker: function(markerConfig) {
				var type = markerConfig.type;
				var latLng = markerConfig.latLng;
				var popupText = markerConfig.popupText;

				var markerOptions = {};
				if (icons[type] !== undefined) {
				  markerOptions.icon = icons[type];
				}
				var marker = leaflet.marker(latLng, markerOptions);
				marker.bindPopup(popupText);
				return marker;
			},

			_translateMarkerGroup: function(group) {
				if (group.constructor === Array) {
					group.forEach(function(markerConfig, i, group) {
						group[i] = this._translateMarker(markerConfig);
					}, this);
				} else { //is hash
					for (dimension in group) {
						group[dimension] = this._translateMarkerGroup(group[dimension]);
					}
				}
				return group;
			},
			
			finish: function (finished) {
				this._markerList = this._translateMarkerGroup(this._model.getMarkerList());
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
					var control = leaflet_matrixlayers(null, null, matrixOverlays, {dimensionNames: ['Type', 'Condition']});
					control.addTo(this._map);
				}
			}
		});

        return PointsView;
    }
);
