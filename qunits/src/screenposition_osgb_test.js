define(["leaflet", "screenposition_osgb"],
    function(leaflet, screenposition_osgb) {
		QUnit.test("screenposition_osgb - should display", function(assert) {
			$('#qunit-fixture').append('<div id="map" style="height: 180px;"></div>');
			var map = leaflet.map('map');
			map.setView([51.505, -0.09], 13);
			var positionDisplayElement = $('div#map div.leaflet-control-mapcentercoord');
			//check that it hasn't shown up yet, just to validate the rest of our test
			assert.ok(positionDisplayElement.length === 0);
			//add the class under test
			screenposition_osgb().addTo(map);
			//now check that the mouse position element is showing up
			positionDisplayElement = $('div#map div.leaflet-control-mapcentercoord');
			assert.ok(positionDisplayElement.length === 1);
			assert.ok(positionDisplayElement.is(":visible"));
		});
	}
);
