define(["os_map", "points", "params", "jquery"],
    function(os_map, points, params, $) {
		
		var locationsFromUrl = params('trigs');
		if (locationsFromUrl != null) {
			var allPoints = locationsFromUrl.split(";");
			for (var i = 0; i < allPoints.length; i++) {
				var point = allPoints[i].split(',');
				points(point[0], point[1], point[2], point[3]);
			}
		} else {
			//dummy data as an example
			points(418678,385093, 'http://trigpointing.uk/trig/6995', 'Winhill Pike');
			points(422816,385344, 'http://trigpointing.uk/trig/3795', 'High Neb');
			points(419762,390990, 'http://trigpointing.uk/trig/949', 'Back Tor');
			points(412927,387809, 'http://trigpointing.uk/trig/3019', 'Edale Moor');
		}
		$('div#loading-message-pane').hide();
    }
);
