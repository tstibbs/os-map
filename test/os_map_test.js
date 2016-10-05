define(['Squire', 'sinon', 'config', 'mouseposition_osgb', 'screenposition_osgb'],
    function(Squire, sinon, Config, mouseposition_osgb, screenposition_osgb) {

		var mouseposition_osgb_mock = mouseposition_osgb();
		var screenposition_osgb_mock = screenposition_osgb();
		
		//TODO check that the right layer is being shown at the right zoom levels, but I'm not sure how...
	
		QUnit.module('osMap', function(hooks) {
			hooks.beforeEach(function() {
				if (localStorage !== undefined) {
					localStorage.clear();
				}
			});
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
			
			QUnit.module('persistance', function() {
				QUnit.test('zoom level', function(assert) {
					var options = {initial_zoom: 12};
					runTest(assert, false, options, function(leafletMap, mouseposition_osgb_mock, screenposition_osgb_mock) {
						//leaflet appears to fire events in add order, so we add an event and wait for it to fire to check that our change has been persisted
						var done = assert.async();
						leafletMap.on('zoomend', function() {
							var newConfig = new Config();
							assert.equal(newConfig.initial_zoom, 16);
							done();
						}, this);
						//run test
						leafletMap.zoomIn(4);
					});
				});
				QUnit.test('map centre', function(assert) {
					var startLatLng = [51.3, -1.2];
					var newLatLng = [53.67, 1.877];
					var options = {start_position: startLatLng};
					runTest(assert, false, options, function(leafletMap, mouseposition_osgb_mock, screenposition_osgb_mock) {
						leafletMap.panTo(newLatLng);
						var newConfig = new Config();
						assert.deepEqual(newConfig.start_position, newLatLng);
					});
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
					runTest(assert, true, {}, function(leafletMap, mouseposition_osgb_mock, screenposition_osgb_mock) {
						//check screen/mouse position is applied correctly based on a mobile browser
						assert.notOk(mouseposition_osgb_mock().addTo.calledOnce, "mouse position should not be displayed");
						assert.ok(screenposition_osgb_mock().addTo.calledOnce, "screen position should be displayed");
					});
				});
			});
			
			QUnit.module('location control', function() {
				QUnit.test('display', function(assert) {
					runTest(assert, false, {show_locate_control: true}, function(leafletMap, mouseposition_osgb_mock, screenposition_osgb_mock, locateMock) {
						assert.ok(locateMock().addTo.calledOnce, "locate control should be displayed");
					});
				});
				
				QUnit.test("don't display", function(assert) {
					runTest(assert, false, {show_locate_control: false}, function(leafletMap, mouseposition_osgb_mock, screenposition_osgb_mock, locateMock) {
					assert.notOk(locateMock().addTo.calledOnce, "locate control should not be displayed");
					});
				});
			});
		});
				
		function runTest(assert, isMobile, options, verify) {
			var done = assert.async();
		
			$('#qunit-fixture').append('<div id="map" style="height: 180px;"></div>');
			
			sinon.spy(mouseposition_osgb_mock, "addTo");
			sinon.spy(screenposition_osgb_mock, "addTo");
			var locateMock = {addTo: sinon.spy()};

			var injector = new Squire();
			injector.mock('mobile', {isMobile: function() {return isMobile;}});
			injector.mock('mouseposition_osgb', function() {return mouseposition_osgb_mock;});
			injector.mock('screenposition_osgb', function() {return screenposition_osgb_mock;});
			injector.mock('locate', function() {return locateMock;});
			
			injector.require(['os_map', 'mouseposition_osgb', 'screenposition_osgb', 'locate'],
				function(OsMap, mouseposition_osgb, screenposition_osgb, locate) {
					//run test
					var map = new OsMap(new Config(options));
					var leafletMap = map.getMap();
					//inspect
					verify(leafletMap, mouseposition_osgb, screenposition_osgb, locate);
					//tear down
					mouseposition_osgb_mock.addTo.restore();
					screenposition_osgb_mock.addTo.restore();
					injector.clean();
					waitForBingLayerToFinish(done);
				}
			);
		}
		
		//hack because the bing layer adds and removes functions in a way that can cause an overlap between tests
		function waitForBingLayerToFinish(done) {
			var metadataFunctionsExist = false;
			for (fn in window) {
				if (/_bing_metadata.*/.test(fn) && typeof(window[fn]) == 'function' ) {
					metadataFunctionsExist = true;
					break;
				}
			}
			if (metadataFunctionsExist === true) {
				setTimeout(function() {
					waitForBingLayerToFinish(done);
				}, 100);
			} else {
				done();
			}
		}
	}
);
