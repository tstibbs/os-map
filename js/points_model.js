define(['leaflet'],
	function(leaflet) {
	
		var PointsModel = leaflet.Class.extend({
			initialize: function (config) {
				this._markerList = null;
				this._config = config;
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
			}
		});

		return PointsModel;
	}
);
