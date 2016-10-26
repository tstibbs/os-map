define(['leaflet', 'leaflet_bing'],
	function(leaflet, Leaflet_bing) {

		var bingKey = "LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc";
		
		//OS
		var bingOsLayer = new Leaflet_bing(bingKey, {type: "OrdnanceSurvey", minZoom: 12, maxZoom: 18, maxNativeZoom: 17});
		var bingFallbackLayer = new Leaflet_bing(bingKey, {type: "Road", maxZoom: 11, minZoom: 0}); //fallback layer because the OS maps don't scale well when you zoom out
		var bingOsGroup = leaflet.layerGroup([bingOsLayer, bingFallbackLayer]);
		//Bing road maps
		var bingRoads = new Leaflet_bing(bingKey, {type: "Road", maxZoom: 18, minZoom: 0});
		//OSM
		var osm = new leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			minZoom: 0, maxZoom: 19, attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
		});
		
		var allLayers = {
			"OS":bingOsGroup,
			"Bing Roads": bingRoads,
			"OSM": osm
		};

		return function(map, addDefaults) {
			if (addDefaults) {
				bingOsGroup.addTo(map);
			}
			
			return allLayers;
		};
	}
);
