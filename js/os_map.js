define(["leaflet", "leaflet_bing", "mouseposition_osgb", "screenposition_osgb", "mobile", "config"],
    function(leaflet, leaflet_bing, mouseposition_osgb, screenposition_osgb, mobile, Config) {
	
        var bingKey = "LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc";
	
		var OsMap = leaflet.Class.extend({
			initialize: function (config) {
				this._config = config;
				// set up the map
				this._map = new leaflet.Map(this._config.map_element_id);
				// create bing layers
				var bingOsLayer = new leaflet_bing(bingKey, {type: "OrdnanceSurvey", minZoom: 12, maxZoom: 18, maxNativeZoom: 17});
				this._map.addLayer(bingOsLayer);
				var fallbackLayer = new leaflet_bing(bingKey, {type: "Road", maxZoom: 11, minZoom: 0});
				this._map.addLayer(fallbackLayer);
				this._map.setView(new leaflet.LatLng(this._config.start_position[0], this._config.start_position[1]), this._config.initial_zoom);
				
				if (mobile.isMobile()) {
					screenposition_osgb().addTo(this._map);
				} else {
					mouseposition_osgb().addTo(this._map);
				}
			},

			getMap: function () {
				return this._map;
			}
		});

        return OsMap;
    }
);
