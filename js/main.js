define(["os_map", "points", "params", "conversion", "jquery"],
    function(os_map, points, params, conversion, $) {
		
		var locationsFromUrl = params('trigs');
		if (locationsFromUrl != null) {
			var allPoints = locationsFromUrl.split(";");
			for (var i = 0; i < allPoints.length; i++) {
				var point = allPoints[i].split(',');
				var lngLat = conversion.osgbToLngLat(point[0], point[1]);
				points.add(lngLat, point[2], point[3]);
			}
		} else if (this.points_to_load !== undefined) {
			//['osgb_gridref','waypoint','name','physical_type'],
			for (var i = 0; i < this.points_to_load.length; i++) {
				var point = this.points_to_load[i];
				var gridref = point[0];
				var waypoint = point[1];
				var name = point[2];
				var waypointRegex = /TP0*(\d+)/;
				var url = null;
				if (waypointRegex.test(waypoint)) {
					var match = waypointRegex.exec(waypoint);
					var trigId = match[1];
					url = 'http://trigpointing.uk/trig/' + trigId;
				}
				try {
					var lngLat = conversion.gridRefToLngLat(gridref);	
				} catch (err) {
					if (console) {console.log(err);}
				}
				points.add(lngLat, url, name);
			}
		} else {
			//dummy data as an example
			points.add(conversion.osgbToLngLat(418678, 385093), 'http://trigpointing.uk/trig/6995', 'Winhill Pike');
			points.add(conversion.osgbToLngLat(422816, 385344), 'http://trigpointing.uk/trig/3795', 'High Neb');
			points.add(conversion.osgbToLngLat(419762, 390990), 'http://trigpointing.uk/trig/949', 'Back Tor');
			points.add(conversion.osgbToLngLat(412927, 387809), 'http://trigpointing.uk/trig/3019', 'Edale Moor');
		}
		points.finish(function() {
			$('div#loading-message-pane').hide();
		});
    }
);
