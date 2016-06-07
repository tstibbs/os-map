define(["os_map", "points", "params"],
    function(os_map, points, params) {
		
		var locationsFromUrl = params('trigs');
		if (locationsFromUrl != null) {
			var allPoints = locationsFromUrl.split(";");
			for (var i = 0; i < allPoints.length; i++) {
				var point = allPoints[i].split(',');
				points(point[0], point[1], point[2], point[3]);
			}
		} else {
			//dummy data as an example
			points(418678,385093);
			points(422816,385344);
			points(419762,390990);
			points(412927,387809);
		}
    }
);
