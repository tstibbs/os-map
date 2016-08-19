define(["leaflet", "screenposition_osgb"],
    function(leaflet, screenposition_osgb) {
		QUnit.module("screenposition_osgb", function(assert) {
			QUnit.test("should display location", function(assert) {
				//set up
				$('#qunit-fixture').append('<div id="map" style="height: 180px;"></div>');
				var map = leaflet.map('map');
				map.setView([51.505, -0.09], 13);
				var $positionDisplay = $('div#map div.leaflet-control-mapcentercoord');
				//check that it hasn't shown up yet, just to validate the rest of our test
				assert.equal(0, $positionDisplay.length);
				//add the class under test
				screenposition_osgb().addTo(map);
				//now check that the mouse position element is showing up
				$positionDisplay = $('div#map div.leaflet-control-mapcentercoord');
				assert.equal(1, $positionDisplay.length);
				assert.ok($positionDisplay.is(":visible"));
				assert.ok(/\w\w \d\d\d\d\d \d\d\d\d\d/.test($positionDisplay.text()));
			});
			
			QUnit.test("clicking should show or hide crosshairs", function(assert) {
				//set up
				$('#qunit-fixture').append('<div id="map" style="height: 180px;"></div>');
				var map = leaflet.map('map');
				map.setView([51.505, -0.09], 13);
				screenposition_osgb().addTo(map);
				//show cross hairs
				var $positionDisplay = $('div#map div.leaflet-control-mapcentercoord');
				$positionDisplay.click();
				var $icon = $('div.leaflet-control-mapcentercoord-icon.leaflet-zoom-hide');//the div _is_ the icon (it uses css to display the image), there is no img element
				assert.equal(1, $icon.length);
				assert.equal('visible', $icon.css("visibility"));
				//hide cross hairs
				$positionDisplay.click();
				assert.equal('hidden', $icon.css("visibility"));
				//sanity check - show cross hairs
				$positionDisplay.click();
				assert.equal('visible', $icon.css("visibility"));
			});
		});
	}
);
