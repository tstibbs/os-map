define(["jquery", "points_model", "config"],
	function($, PointsModel, Config) {
		
		QUnit.module('points_model', function() {
			QUnit.test('all config should be passed through', function(assert) {
				var pointsModel = new PointsModel(new Config({}));
				var lng = -0.09;
				var lat = 51.505;
				var url = "http://example.com/dummyurl";
				var type = 'Pillar';
				var condition = 'thingcondition';
				var extraTexts = ["extraText"];
				pointsModel.add([lng, lat], url, name, extraTexts, type);
				
				var markerList = pointsModel.getMarkerList();
				var marker = markerList[0];
				assert.equal(marker.latLng[0], lat);
				assert.equal(marker.latLng[1], lng);
				assert.equal(marker.name, name);
				assert.equal(marker.extraTexts, extraTexts);
				assert.equal(marker.exportName, name);
				assert.equal(marker.url, url);
				assert.equal(marker.icon, type);
			});
			
			QUnit.test('should divide up for matrix layers', function(assert) {
				//setup
				var pointsModel = new PointsModel(new Config({dimensional_layering: true}));
				var type1 = 'type1';
				var type2 = 'type2';
				var condition1 = 'condition1';
				var condition2 = undefined;
				var name1 = 'namey1';
				var name2 = 'namey2';
				var name3 = 'namey3';
				var name4 = 'namey4';
				pointsModel.add([-0.09, 51.505], null, name1, null, type1, condition1);
				pointsModel.add([-0.08, 51.506], null, name2, null, type1, condition2);
				pointsModel.add([-0.07, 51.507], null, name3, null, type2, condition1);
				pointsModel.add([-0.06, 51.508], null, name4, null, type2, condition2);
				//test
				var markerList = pointsModel.getMarkerList();
				assert.equal(Object.keys(markerList).length, 2);
				{
					var type1_actual = markerList[type1];
					assert.ok(type1_actual !== null);
					assert.equal(Object.keys(type1_actual).length, 2);
					{
						var condition1_actual = type1_actual[condition1];
						assert.equal(condition1_actual.length, 1);
						assert.equal(condition1_actual[0].name, name1);
					}
					{
						var condition2_actual = type1_actual[condition2];
						assert.equal(condition2_actual.length, 1);
						assert.equal(condition2_actual[0].name, name2);
					}
				}
				{
					var type2_actual = markerList[type2];
					assert.ok(type2_actual !== null);
					assert.equal(Object.keys(type2_actual).length, 2);
					{
						var condition1_actual = type2_actual[condition1];
						assert.equal(condition1_actual.length, 1);
						assert.equal(condition1_actual[0].name, name3);
					}
					{
						var condition2_actual = type2_actual[condition2];
						assert.equal(condition2_actual.length, 1);
						assert.equal(condition2_actual[0].name, name4);
					}
				}
			});
		});
		
		function getTextOfSingleMarker(assert, pointsModel, expectedType, expectedCondition) {
			var markerList = pointsModel.getMarkerList();
			assert.equal(markerList.length, 1);
			assert.equal(markerList[0].icon, expectedType);
			assert.equal(markerList[0].condition, expectedCondition);
			return getPopup(markerList[0]);
		}
		
		function getPopup(markerConfig) {
			return $('<div>' + markerConfig.popupText + '</div>');
		}
	}
);
