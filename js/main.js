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
			points(522270, 295925); //TL 22270 95925
			points(334695, 505141); //NY 34695 05141
		}
    }
);
