define(["jquery", "points_model", "config"],
	function($, PointsModel, Config) {
		
		QUnit.module('points_model', function() {
			QUnit.test('condition is optional', function(assert) {
				var pointsModel = new PointsModel(new Config({}));
				var url = "http://example.com/dummyurl";
				var name = "blahpoint";
				var type = 'Pillar';
				var condition = undefined;
				pointsModel.add([-0.09, 51.505], url, name, "extraText", type);
				var markerList = pointsModel.getMarkerList();
				assert.equal(1, markerList.length);
				assert.equal(type, markerList[0].type);
				assert.equal(condition, markerList[0].condition);
				assert.notEqual(-1, markerList[0].popupText.indexOf(name));
				assert.notEqual(-1, markerList[0].popupText.indexOf(url));
			});
			
			QUnit.test('should accept null name', function(assert) {
				//setup
				var pointsModel = new PointsModel(new Config({}));
				var url = "http://example.com/dummyurl";
				var name = null;
				var type = 'Pillar';
				var condition = undefined;
				pointsModel.add([-0.09, 51.505], url, name, "extraText", type);
				//test
				var $text = getTextOfSingleMarker(assert, pointsModel, type, condition);
				$anchor = $('a', $text);
				assert.equal($anchor.text(), $anchor.attr('href'));
			});
			
			QUnit.test('should accept null url', function(assert) {
				//setup
				var pointsModel = new PointsModel(new Config({}));
				var name = "thisisaname";
				pointsModel.add([-0.09, 51.505], null, name);
				//test
				var $text = getTextOfSingleMarker(assert, pointsModel, undefined, undefined);
				$anchor = $('a', $text);
				assert.equal($('a', $text).length, 0);
				assert.ok($text.text().indexOf(name) !== -1);//just check it's included, we're not too concerned where
			});
			
			QUnit.test('should include extra text', function(assert) {
				//setup
				var pointsModel = new PointsModel(new Config({}));
				var extraText = "blah stuff thing"
				pointsModel.add([-0.09, 51.505], "http://example.com/dummyurl", "xpoint", extraText);
				//test
				var $text = getTextOfSingleMarker(assert, pointsModel, undefined, undefined);
				assert.ok($text.text().indexOf(extraText) !== -1);//just check it's included, we're not too concerned where
			});
			
			QUnit.test('should divide up for matrix layers', function(assert) {
				//setup
				var pointsModel = new PointsModel(new Config({dimensional_layering: true}));
				var type1 = 'type1';
				var type2 = 'type2';
				var condition1 = 'condition1';
				var condition2 = 'condition2';
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
				assert.equal(2, Object.keys(markerList).length);
				{
					var type1_actual = markerList[type1];
					assert.ok(type1_actual !== null);
					assert.equal(2, Object.keys(type1_actual).length);
					{
						var condition1_actual = type1_actual[condition1];
						assert.equal(1, condition1_actual.length);
						assert.equal(name1, getPopup(condition1_actual[0]).text());
					}
					{
						var condition2_actual = type1_actual[condition2];
						assert.equal(1, condition2_actual.length);
						assert.equal(name2, getPopup(condition2_actual[0]).text());
					}
				}
				{
					var type2_actual = markerList[type2];
					assert.ok(type2_actual !== null);
					assert.equal(2, Object.keys(type2_actual).length);
					{
						var condition1_actual = type2_actual[condition1];
						assert.equal(1, condition1_actual.length);
						assert.equal(name3, getPopup(condition1_actual[0]).text());
					}
					{
						var condition2_actual = type2_actual[condition2];
						assert.equal(1, condition2_actual.length);
						assert.equal(name4, getPopup(condition2_actual[0]).text());
					}
				}
			});
		});
		
		function getTextOfSingleMarker(assert, pointsModel, expectedType, expectedCondition) {
			var markerList = pointsModel.getMarkerList();
			assert.equal(1, markerList.length);
			assert.equal(expectedType, markerList[0].type);
			assert.equal(expectedCondition, markerList[0].condition);
			return getPopup(markerList[0]);
		}
		
		function getPopup(markerConfig) {
			return $('<div>' + markerConfig.popupText + '</div>');
		}
	}
);
