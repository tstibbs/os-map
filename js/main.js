define(["os_map", "points_model", "points_view", "config", "params", "conversion", "jquery"],
    function(OsMap, PointsModel, PointsView, Config, params, conversion, $) {
			
		function finish() {
			$('div#loading-message-pane').hide();
		}
		
		return {
			_buildMap: function(options) {
				var config = new Config(options);
				var osMap = new OsMap(config);
				this._pointsModel = new PointsModel(config);
				this._pointsView = new PointsView(osMap.getMap(), config, this._pointsModel);
			},
			
			hasUrlData: function() {
				return params('trigs') != null;
			},
			
			buildMapFromUrl: function(options) {
				this._buildMap(options);
				var locationsFromUrl = params('trigs');
				var allPoints = locationsFromUrl.split(";");
				for (var i = 0; i < allPoints.length; i++) {
					var point = allPoints[i].split(',');
					var lngLat = conversion.osgbToLngLat(point[0], point[1]);
					this._pointsModel.add(lngLat, point[2], point[3]);
				}
				this._pointsView.finish(finish);
			},
			
			buildMapWithDummyData: function(options) {
				this._buildMap(options);
				//dummy data as an example
				this._pointsModel.add(conversion.osgbToLngLat(418678, 385093), 'http://trigpointing.uk/trig/6995', 'Winhill Pike');
				this._pointsModel.add(conversion.osgbToLngLat(422816, 385344), 'http://trigpointing.uk/trig/3795', 'High Neb');
				this._pointsModel.add(conversion.osgbToLngLat(419762, 390990), 'http://trigpointing.uk/trig/949', 'Back Tor');
				this._pointsModel.add(conversion.osgbToLngLat(412927, 387809), 'http://trigpointing.uk/trig/3019', 'Edale Moor');
				this._pointsView.finish(finish);
			},
			
			buildMapWithData: function(options, pointsToLoad) {
				this._buildMap(options);
				//['osgb_gridref','waypoint','name','physical_type','condition'],
				for (var i = 0; i < pointsToLoad.length; i++) {
					var point = pointsToLoad[i];
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
					}
					var extraInfo = '<span>Condition: '+condition+'</span><br /><span>Physical Type: '+physicalType+'</span>';
					this._pointsModel.add(lngLat, url, name, extraInfo, physicalType, condition);
				}
				this._pointsView.finish(finish);
			}
		};
    }
);
