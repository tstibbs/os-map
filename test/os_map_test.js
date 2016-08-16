define(['Squire', 'sinon', 'mouseposition_osgb', 'screenposition_osgb'],
    function(Squire, sinon, mouseposition_osgb, screenposition_osgb) {
	
		var injector = new Squire();
		
		var mouseposition_osgb_mock = mouseposition_osgb();
		var screenposition_osgb_mock = screenposition_osgb();
		
		//TODO check that the right layer is being shown at the right zoom levels, but I'm not sure how...
	
		QUnit.module('osMap', function() {
			QUnit.test('map centre', function(assert) {
				var lat = 51.3;
				var lng = -1.2;
				var options = {
					start_position: [lat, lng]
				};
				runTest(assert, false, options, function(leafletMap, mouseposition_osgb_mock, screenposition_osgb_mock) {
					var actualCentre = leafletMap.getCenter();
					var actualLat = actualCentre.lat;
					var actualLng = actualCentre.lng;
					assert.equal(actualLat, lat);
					assert.equal(actualLng, lng);
				});
			});
			
			QUnit.test('zoom level', function(assert) {
				var zoomLevel = 12;
				var options = {
					initial_zoom: zoomLevel
				};
				runTest(assert, false, options, function(leafletMap, mouseposition_osgb_mock, screenposition_osgb_mock) {
					var actualZoom = leafletMap.getZoom();
					assert.equal(actualZoom, zoomLevel);
				});
			});
			
			QUnit.module('location displays', function() {
				QUnit.test('non-mobile', function(assert) {
					runTest(assert, false, {}, function(leafletMap, mouseposition_osgb_mock, screenposition_osgb_mock) {
						//check screen/mouse position is applied correctly based on a desktop browser
						assert.ok(mouseposition_osgb_mock().addTo.calledOnce, "mouse position should be displayed");
						assert.notOk(screenposition_osgb_mock().addTo.calledOnce, "screen position should not be displayed");
					});
				});
				
				QUnit.test('mobile', function(assert) {
					runTest(assert, false, {}, function(leafletMap, mouseposition_osgb_mock, screenposition_osgb_mock) {
						//check screen/mouse position is applied correctly based on a mobile browser
						assert.ok(mouseposition_osgb_mock().addTo.calledOnce, "mouse position should be displayed");
						assert.notOk(screenposition_osgb_mock().addTo.calledOnce, "screen position should not be displayed");
					});
				});
			});
		});
		
		function runTest(assert, isMobile, options, verify) {
			var done = assert.async();
		
			$('#qunit-fixture').append('<div id="map" style="height: 180px;"></div>');
			
			sinon.spy(mouseposition_osgb_mock, "addTo");
			sinon.spy(screenposition_osgb_mock, "addTo");

			injector.mock('mobile', {isMobile: function() {return isMobile;}});
			injector.mock('mouseposition_osgb', function() {return mouseposition_osgb_mock;});
			injector.mock('screenposition_osgb', function() {return screenposition_osgb_mock;});
			
			injector.require(['os_map', 'mouseposition_osgb', 'screenposition_osgb'],
				function(OsMap, mouseposition_osgb, screenposition_osgb) {
					//run test
					var map = new OsMap(options);
					var leafletMap = map.getMap();
					//inspect
					verify(leafletMap, mouseposition_osgb, screenposition_osgb);
					//tear down
					mouseposition_osgb_mock.addTo.restore();
					screenposition_osgb_mock.addTo.restore();
					done();
				}
			);
		}
	}
);
