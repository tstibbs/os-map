define(["leaflet", "points"],
    function(leaflet, Points) {
		QUnit.test("points - marker should display", function(assert) {
			$('#qunit-fixture').append('<div id="map" style="height: 180px;"></div>');
			var map = leaflet.map('map');
			map.setView([51.505, -0.09], 13);
			
			var points = new Points(map, {});
			points.add([-0.09, 51.505], "http://example.com/dummyurl", "blahpoint");
			points.finish(function() {});//callback not needed as not async here
			
			var markerElements = $('img.leaflet-marker-icon');
			assert.ok(markerElements.length === 1);
			assert.ok(markerElements.is(":visible"));
			assert.ok( markerElements[0].src.endsWith('marker-icon.png'));
		});
	}
);
