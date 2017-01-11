define(['leaflet', 'conversion'],
	function(leaflet, conversion) {
	
		var PointsBuilder = leaflet.Class.extend({
			initialize: function (config, bundleConfig) {
				this._markerList = null;
				this._config = config;
				this._bundleConfig = bundleConfig;
			},
			
			parse: function(point) {
				//['osgb_gridref','waypoint','name','physical_type','condition'],
				var gridref = point[0];
				var waypoint = point[1];
				var name = point[2];
				var physicalType = point[3];
				var condition = point[4];
				var waypointRegex = /TP0*(\d+)/;
				var url = null;
				if (waypointRegex.test(waypoint)) {
					var match = waypointRegex.exec(waypoint);
					var trigId = match[1];
					url = 'http://trigpointing.uk/trig/' + trigId;
				}
				var lngLat;
				try {
					lngLat = conversion.gridRefToLngLat(gridref);	
				} catch (err) {
					if (console) {console.log(err);}
					return;
				}
				var extraInfos = {
					'Condition': condition,
					'Physical Type': physicalType
				};
				this.add(lngLat, url, name, extraInfos, physicalType, condition);
			},

			add: function (lngLat, url, name, extraTexts, type, condition) {
				var lng = lngLat[0];
				var lat = lngLat[1];
				
				var marker = {
					latLng: [lat, lng],
					name: name,
					extraTexts: extraTexts,
					exportName: name,
					url: url,
					icon: type
				}
				
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
			
			getMarkerList: function() {
				return this._markerList;
			},
			
			getBundleConfig: function() {
				return this._bundleConfig;
			}
		});

		return PointsBuilder;
	}
);
