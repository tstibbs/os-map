define(["underscore", "leaflet", "leaflet_cluster", "leaflet_subgroup", "leaflet_matrixlayers"],
	function(_, leaflet, leaflet_cluster, leaflet_subgroup, Leaflet_MatrixLayers) {
	
		var PointsView = leaflet.Class.extend({
			initialize: function (map, config, modelsByAspect, controls, layers) {
				this._map = map;
				this._config = config;
				this._modelsByAspect = modelsByAspect;
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
			
			_mergeMarkerLists: function() {
				var allMarkers = [];
				Object.keys(this._modelsByAspect).forEach(function(key){
					allMarkers = allMarkers.concat(this._modelsByAspect[key].getMarkerList());
				}.bind(this));
				return allMarkers;
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
					var markerList = this._translateMarkerGroup(this._mergeMarkerLists());
					if (this._config.cluster) {
						parentGroup.addLayers(markerList);
					} else {
						for (var i = 0; i < markerList.length; i++) {
							parentGroup.addLayer(markerList[i]);
						}
					}
				} else {
					var control = new Leaflet_MatrixLayers(this._layers, null, {}, {
						multiAspects: true
					});
					for (var aspect in this._modelsByAspect) {
						var model = this._modelsByAspect[aspect]
						var markerList = this._translateMarkerGroup(model.getMarkerList());
						var matrixOverlays = {};
						var iter = function(markers, path) {
							if (markers.constructor === Array) {
								var subGroup = leaflet.featureGroup.subGroup(parentGroup, markers);
								//don't add to the map yet - let the layer control do that if it thinks it needs to - otherwise we could add all layers then immediately try to remove them all, which can cause UI weirdness
								matrixOverlays[path] = subGroup;
							} else {
								Object.keys(markers).forEach(function (dimValue) {
									var newPath = path.length == 0 ? dimValue : path + '/' + dimValue;
									var sublist = markers[dimValue];
									iter(sublist, newPath);
								});
							}
						}
						iter(markerList, '');
						var aspectOptions = this._config.bundles[aspect];//will have other options, but collisions are unlikely
						control.addAspect(aspect, matrixOverlays, aspectOptions);
					}
					//override the basic layers control
					this._controls.addControl(control);
				}
			}
		});

		return PointsView;
	}
);
