define(["os_map", "points", "params", "conversion", "jquery"],
    function(OsMap, Points, params, conversion, $) {
	
		function buildMap(options) {
			var osMap = new OsMap(options);
			var points = new Points(osMap.getMap(), options);
			return points;
		}
		
		function finish() {
			$('div#loading-message-pane').hide();
		}
		
		return {
			hasUrlData: function() {
				return params('trigs') != null;
			},
			
			buildMapFromUrl: function(options) {
				var points = buildMap(options);
				var locationsFromUrl = params('trigs');
				var allPoints = locationsFromUrl.split(";");
				for (var i = 0; i < allPoints.length; i++) {
					var point = allPoints[i].split(',');
					var lngLat = conversion.osgbToLngLat(point[0], point[1]);
					points.add(lngLat, point[2], point[3]);
				}
				points.finish(finish);
			},
			
			buildMapWithDummyData: function(options) {
				var points = buildMap(options);
				//dummy data as an example
				points.add(conversion.osgbToLngLat(418678, 385093), 'http://trigpointing.uk/trig/6995', 'Winhill Pike');
				points.add(conversion.osgbToLngLat(422816, 385344), 'http://trigpointing.uk/trig/3795', 'High Neb');
				points.add(conversion.osgbToLngLat(419762, 390990), 'http://trigpointing.uk/trig/949', 'Back Tor');
				points.add(conversion.osgbToLngLat(412927, 387809), 'http://trigpointing.uk/trig/3019', 'Edale Moor');
				points.finish(finish);
			},
			
			buildMapWithData: function(options, pointsToLoad) {
				var points = buildMap(options);
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
					points.add(lngLat, url, name, extraInfo, physicalType, condition);
				}
				points.finish(finish);
			}
		};
    }
);
