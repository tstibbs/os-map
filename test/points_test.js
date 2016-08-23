define(["Squire", "leaflet", "jquery", "points", "leaflet_cluster"],
    function(Squire, leaflet, $, Points, leaflet_cluster) {
	
		var leaflet_cluster_mock = leaflet_cluster();
	
		QUnit.module('points', function() {
			QUnit.test('basic marker should display', function(assert) {
				var points = dummyMap(Points, {});
				points.add([-0.09, 51.505], "http://example.com/dummyurl", "blahpoint");
				points.finish(function() {});//callback not needed as not async here
				
				var markerElements = $('img.leaflet-marker-icon');
				assert.ok(markerElements.length === 1, "should just be one marker icon");
				assert.ok(markerElements.is(":visible"), "should be visible");
				var markerIconSource = markerElements[0].src;
				assert.ok(/.*\/marker\-icon(\-[\d\w]+)?\.png/.test(markerIconSource), "should be a standard marker icon, was: " + markerIconSource);
			});
			
			QUnit.test('marker should display based on type', function(assert) {
				var points = dummyMap(Points, {});
				points.add([-0.09, 51.505], "http://example.com/dummyurl", "blahpoint", "extraText", "Pillar");
				points.finish(function() {});
				
				var markerIconSource = $('img.leaflet-marker-icon')[0].src;
				assert.ok(/.*img\/pillar\.png/.test(markerIconSource), "should be a pillar marker icon, was: " + markerIconSource);
			});
			
			QUnit.test('should accept null name', function(assert) {
				//setup
				var points = dummyMap(Points, {});
				points.add([-0.09, 51.505], "http://example.com/dummyurl", null);
				points.finish(function() {});
				//test
				$text = getOneMarkerText(assert, points);
				$anchor = $('a', $text);
				assert.equal($anchor.text(), $anchor.attr('href'));
			});
			
			QUnit.test('should accept null url', function(assert) {
				//setup
				var points = dummyMap(Points, {});
				var markerName = "thisisaname"
				points.add([-0.09, 51.505], null, markerName);
				points.finish(function() {});
				//test
				$text = getOneMarkerText(assert, points);
				assert.equal($('a', $text).length, 0);
				assert.ok($text.text().indexOf(markerName) !== -1);//just check it's included, we're not too concerned where
			});
			
			QUnit.test('should include extra text', function(assert) {
				//setup
				var points = dummyMap(Points, {});
				var extraText = "blah stuff thing"
				points.add([-0.09, 51.505], "http://example.com/dummyurl", "xpoint", extraText);
				points.finish(function() {});
				//test
				$text = getOneMarkerText(assert, points);
				assert.ok($text.text().indexOf(extraText) !== -1);//just check it's included, we're not too concerned where
			});
			
			QUnit.module('clustering and layering', function() {
				QUnit.test('clustering should work', function(assert) {
					//check that cluster layer is invoked. we can assume that it works, so we shouldn't need to check its functionality in a unit test
					var options = {
						cluster: true
					};
					runTest(assert, options, function(points, leaflet_cluster_mock) {
						//run test
						var name1 = "blahpoint1";
						var name2 = "blahpoint2";
						var latLng1 = [-0.09, 51.505];
						var latLng2 = [0.5, 50];
						points.add(latLng1, null, name1);
						points.add(latLng2, null, name2);
						points.finish(function(){});
						//verify
						assert.ok(leaflet_cluster_mock().addTo.calledOnce, "should have been added to the map");
						assert.ok(leaflet_cluster_mock().addLayers.calledOnce, "should have added some markers");
						var markerList = leaflet_cluster_mock().addLayers.getCall(0).args[0];
						assert.equal(2, markerList.length);
						//marker 1
						var marker1 = markerList[0];
						assert.equal(latLng1[0], marker1.getLatLng().lng);
						assert.equal(latLng1[1], marker1.getLatLng().lat);
						assert.notEqual(-1, marker1.getPopup().getContent().indexOf(name1), "marker 1 popup should contain its name");
						assert.equal(-1, marker1.getPopup().getContent().indexOf(name2), "marker 1 popup should not contain marker 2's name");
						//marker 2
						var marker2 = markerList[1];
						assert.equal(latLng2[0], marker2.getLatLng().lng);
						assert.equal(latLng2[1], marker2.getLatLng().lat);
						assert.notEqual(-1, marker2.getPopup().getContent().indexOf(name2), "marker 2 popup should contain its name");
						assert.equal(-1, marker2.getPopup().getContent().indexOf(name1), "marker 2 popup should not contain marker 1's name");
					});
				});
				
				QUnit.test('matrixing should work', function(assert) {
					//check layer groupings have been computed correctly
					//check magic layer is invoked
					//check matrix control is added
					assert.expect(0);
				});
				
				QUnit.test('clustering and matrixing should work together', function(assert) {
					//check everything from both of the others?
					assert.expect(0);
				});
				
				function runTest(assert, options, callback) {
					var done = assert.async();	
					
					sinon.stub(leaflet_cluster_mock, "addLayers");
					sinon.stub(leaflet_cluster_mock, "addTo");
					
					var injector = new Squire();
					injector.mock('leaflet_cluster', function() {return leaflet_cluster_mock;});
					
					injector.require(['points', 'leaflet_cluster'],
						function(Points, leaflet_cluster_mock) {
							//run test
							var points = dummyMap(Points, options);
							//inspect
							callback(points, leaflet_cluster_mock);
							//tear down
							leaflet_cluster_mock().addLayers.restore();
							leaflet_cluster_mock().addTo.restore();
							injector.clean();
							done();
						}
					);
				}
			});
		});
		
		function dummyMap(Points, options) {
			$('#qunit-fixture').append('<div id="map" style="height: 180px;"></div>');
			var map = leaflet.map('map');
			map.setView([51.505, -0.09], 13);
			var points = new Points(map, options);
			return points;
		}
		
		function getOneMarkerText(assert, points) {
			var markerTexts = getAllMarkerTexts(points)
			assert.equal(markerTexts.length, 1);
			return $('<div>' + markerTexts[0] + '</div>');
		}
		
		function getAllMarkerTexts(points) {
			var markerTexts = [];
			var map = points._map;
			$.each(map._layers, function (ml) {
				var layers = map._layers[ml]._layers;
				if (layers !== undefined) {
					Object.keys(layers).forEach(function (key) { 
						var feature = layers[key]
						if (feature.getPopup() && feature.getPopup().getContent()) {
							markerTexts.push(feature.getPopup().getContent());
						}
					})
				}
			});
			return markerTexts;
		}
	}
);
