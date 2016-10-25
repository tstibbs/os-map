define(["Squire", "sinon", "leaflet", "jquery", "points_view", "config", "controls"],
	function(Squire, Sinon, leaflet, $, PointsView, Config, Controls) {
		
		QUnit.module('points view', function() {
			function testIcon(assert, type, popupText) {
				//test
				var marker = {
					latLng: [-0.09, 51.505],
					type: type,
					popupText: popupText
				};
				var pointsView = dummyMap(PointsView, { cluster: false }, [marker]);
				pointsView.finish(function() {});//callback not needed as not async here
				//verify
				var markerElements = $('img.leaflet-marker-icon');
				assert.ok(markerElements.length === 1, "should just be one marker icon");
				assert.ok(markerElements.is(":visible"), "should be visible");
				return pointsView;
			}
		
			QUnit.test('basic marker should display', function(assert) {
				testIcon(assert);
				var markerIconSource = $('img.leaflet-marker-icon')[0].src
				assert.ok(/.*\/marker\-icon(\-[\d\w]+)?\.png/.test(markerIconSource), "should be a standard marker icon, was: " + markerIconSource);
			});
			
			QUnit.test('marker should display based on type', function(assert) {
				testIcon(assert, 'Pillar');
				var markerIconSource = $('img.leaflet-marker-icon')[0].src
				assert.ok(/.*img\/pillar\.png/.test(markerIconSource), "should be a pillar marker icon, was: " + markerIconSource);
			});
			
			QUnit.test('marker should display text', function(assert) {
				var popupText = "blah popup text stuff<br>more xyz";
				var pointsView = testIcon(assert, undefined, popupText);
				$text = getOneMarkerText(assert, pointsView);
				assert.equal(popupText, $text.html());
			});
			
			QUnit.module('clustering and layering', function() {
				QUnit.test('cluster layer should work and should have required markers', function(assert) {
					var done = assert.async();
					var initialMarkers = [
						{
							latLng: [-0.09, 51.505],
							popupText: 'abc'
						},
						{
							latLng: [-0.09, 51.505],
							popupText: 'def'
						}
					];
					
					var injector = new Squire();
					var leafletClusterMock = sinon.stub();
					var leafletClusterSpy = sinon.spy(function() {return leafletClusterMock});
					leafletClusterMock.addLayers = sinon.stub();
					leafletClusterMock.addTo = sinon.stub();
					injector.mock('leaflet_cluster', leafletClusterSpy);
					injector.require(['points_view'],
						function(PointsView) {
							var pointsView = dummyMap(PointsView, {cluster: true}, initialMarkers);
							pointsView.finish(function() {});
							//check leaflet_cluster constructor is called
							assert.ok(leafletClusterSpy.calledOnce, "cluster layer group is needed");
							//check all markers are added
							assert.ok(leafletClusterMock.addLayers.calledOnce, "should have added layers");
							var markers = leafletClusterMock.addLayers.getCall(0).args[0];
							assert.equal(2, markers.length, "should have added both markers");
							assert.equal('abc', markers[0].getPopup().getContent());
							assert.equal('def', markers[1].getPopup().getContent());
							//check cluster layer is added to the map
							assert.ok(leafletClusterMock.addTo.calledOnce, "should have added layer to map");
							//tidy
							injector.clean();
							done();
						}
					);
				});
				
				QUnit.test('matrix layers should be set up correctly', function(assert) {
					var done = assert.async();
					var name1 = 'abc';
					var name2 = 'def';
					var name3 = 'ghi';
					var name4 = 'jkl';
					var type1 = 'type1';
					var type2 = 'type2';
					var condition1 = 'condition1';
					var condition2 = 'condition2';
					var initialMarkers = {
						type1 : {
							condition1: [
								{
									latLng: [-0.06, 51.505],
									popupText: name1
								},
							],
							condition2: [
								{
									latLng: [-0.07, 51.506],
									popupText: name2
								}
							]
						},
						type2 : {
							condition1: [
								{
									latLng: [-0.08, 51.507],
									popupText: name3
								},
							],
							condition2: [
								{
									latLng: [-0.09, 51.508],
									popupText: name4
								}
							]
						}
					};
					
					var injector = new Squire();
					var MatrixlayersMock = sinon.stub();
					MatrixlayersMock.prototype.addTo = sinon.stub();
					injector.mock('leaflet_matrixlayers', MatrixlayersMock);
					injector.require(['points_view'],
						function(PointsView) {
							var pointsView = dummyMap(PointsView, {cluster: false, dimensional_layering: true}, initialMarkers);
							pointsView.finish(function() {});
							//check matrix layers constructor is called
							assert.ok(MatrixlayersMock.calledOnce, "matrix layer control is needed");
							//check all markers are added
							var actualMarkers = MatrixlayersMock.getCall(0).args[2];
							assert.ok(name1, actualMarkers[type1 + '/' + condition1].getLayers()[0].getPopup().getContent());
							assert.ok(name2, actualMarkers[type1 + '/' + condition2].getLayers()[0].getPopup().getContent());
							assert.ok(name3, actualMarkers[type2 + '/' + condition1].getLayers()[0].getPopup().getContent());
							assert.ok(name4, actualMarkers[type2 + '/' + condition2].getLayers()[0].getPopup().getContent());
							// //check cluster layer is added to the map
							var found = false;
							for (var i = 0; i < pointsView._controls._controlsToAdd.length; i++) {
								found |= pointsView._controls._controlsToAdd[i] instanceof MatrixlayersMock;
							}
							assert.ok(found, "should have added layer to map");
							//tidy
							injector.clean();
							done();
						}
					);
				});
			});
		});
		
		function dummyMap(PointsView, options, markerList) {
			$('#qunit-fixture').append('<div id="map" style="height: 180px;"></div>');
			var map = leaflet.map('map', {maxZoom: 10});
			map.setView([51.505, -0.09], 13);
			var bundle = {
				icons: {
					Pillar: leaflet.icon({
						iconUrl: window.os_map_base + 'img/pillar.png',
						iconAnchor: [10, 40], // point of the icon which will correspond to marker's location
						popupAnchor: [1, -38] // point from which the popup should open relative to the iconAnchor
					})
				}
			};
			var config = new Config(options, [bundle]);
			var pointsModel = {};
			pointsModel.getMarkerList = function() {return markerList};
			var pointsView = new PointsView(map, config, pointsModel, new Controls());
			return pointsView;
		}
		
		function getOneMarkerText(assert, pointsView) {
			var markerTexts = getAllMarkerTexts(pointsView)
			assert.equal(markerTexts.length, 1);
			return $('<div>' + markerTexts[0] + '</div>');
		}
		
		function getAllMarkerTexts(pointsView) {
			var markerTexts = [];
			var map = pointsView._map;
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
