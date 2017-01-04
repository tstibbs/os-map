define(['leaflet'],
	function(leaflet) {
	
		var PointsBuilder = leaflet.Class.extend({
			initialize: function (config) {
				this._markerList = null;
				this._config = config;
			},
			
			parse: function(point, pointsModel) {
				//["Number","Name","Classification","Metres","Longitude","Latitude"],
				var number = point[0];
				var name = point[1];
				var classification = point[2];
				var height = point[3];
				var lng = point[4];
				var lat = point[5];
				
				var lngLat = [lng, lat];
				var url = "";
				var physicalType = "*";
				var condition = "*";

				this._add(lngLat, url, name, null, classification);

			},

			_add: function (lngLat, url, name, extraTexts, classification) {
				var lng = lngLat[0];
				var lat = lngLat[1];
				
				var marker = {
					latLng: [lat, lng],
					name: name,
					extraTexts: extraTexts,
					exportName: name,
					url: url,
					icon: 'icon'
				}
				
				if (this._config.dimensional_layering) {
					if (this._markerList == null) {
						this._markerList = {};
					}
					var markersByType = this._markerList[classification];
					if (markersByType == null) {
						this._markerList[classification] = [];
						markersByType = this._markerList[classification];
					}
					markersByType.push(marker);
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

		return PointsBuilder;
	}
);
