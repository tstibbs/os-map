define(["underscore", "leaflet", "leaflet_cluster", "leaflet_subgroup", "leaflet_matrixlayers", "points_model"],
	function(_, leaflet, leaflet_cluster, leaflet_subgroup, Leaflet_MatrixLayers, PointsModel) {
	
		var PointsView = leaflet.Class.extend({
			initialize: function (map, config, pointsModel, controls, layers) {
				this._markerList = null;
				this._map = map;
				this._config = config;
				this._model = pointsModel;
				this._controls = controls;
				this._layers = layers;
			},
			
			_notEmpty: function(input) {
				return input !== undefined && input !== null && input.length > 0;
			},
			
			_translateMarker: function(markerConfig) {
				//get everything from the model - anything that gets put into the dom needs to be escaped to prevent XSS
				var latLng = markerConfig.latLng;
				var name = _.escape(markerConfig.name);
				var extraTexts = markerConfig.extraTexts;
				if (extraTexts != null) {
					extraTexts = extraTexts.map(function(val) {return _.escape(val);});
				}
				var exportName = _.escape(markerConfig.exportName);
				var icon = markerConfig.icon;
				var url = _.escape(markerConfig.url);
				
				//construct the contents of the popup
				if (!this._notEmpty(name)) {
					name = url;
				}
				if (this._notEmpty(exportName)) {
					exportName = name;
				}
				var popupText = "";
				if (this._notEmpty(url)) {
					popupText = '<a href="' + url + '">' + name + '</a>';
				} else if (this._notEmpty(name)) {
					popupText = '<span>' + name + '</span>';
				}
				if (extraTexts != null) {
					for (var i = 0; i < extraTexts.length; i++) {
						if (popupText.length > 0) {
							popupText += '<br />';
						}
						popupText = popupText + '<span>' + extraTexts[i] + '</span>';
					}
				}

				var markerOptions = {};
				if (this._config.icons[icon] !== undefined) {
					markerOptions.icon = this._config.icons[icon];
				}
				var marker = leaflet.marker(latLng, markerOptions);
				marker.bindPopup(popupText);
				if (exportName != null) {
					//selection control looks for .name in its default actions
					marker.name = exportName.replace(/"/g, "'");
				}
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
					var control = new Leaflet_MatrixLayers(this._layers, null, matrixOverlays, {
						dimensionNames: this._config.dimensionNames,
						dimensionLabels: this._config.dimensionLabels,
						dimensionValueLabels: this._config.dimensionValueLabels
					});
					//override the basic layers control
					this._controls.addControl(control);
				}
			}
		});

		return PointsView;
	}
);
