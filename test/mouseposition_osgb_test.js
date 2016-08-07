define(["leaflet", "mouseposition_osgb"],
    function(leaflet, mouseposition_osgb) {
		QUnit.test("mouseposition_osgb - should display", function(assert) {
			$('#qunit-fixture').append('<div id="map" style="height: 180px;"></div>');
			var map = leaflet.map('map');
			var positionDisplayElement = $('div#map div.leaflet-control-mouseposition');
			//check that it hasn't shown up yet, just to validate the rest of our test
			assert.ok(positionDisplayElement.length === 0);
			//add the class under test
			mouseposition_osgb().addTo(map);
			//now check that the mouse position element is showing up
			positionDisplayElement = $('div#map div.leaflet-control-mouseposition');
			assert.ok(positionDisplayElement.length === 1);
			assert.ok(positionDisplayElement.is(":visible"));
		});
	}
);
