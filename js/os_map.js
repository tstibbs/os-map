define(["leaflet", "leaflet_bing", "mouseposition_osgb", "screenposition_osgb", "mobile"],
    function(leaflet, leaflet_bing, mouseposition_osgb, screenposition_osgb, mobile) {
        // set up the map
        var map = new leaflet.Map('map');

        // create bing layers
        var bingKey = "LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc";
        var bingOsLayer = new leaflet_bing(bingKey, {type: "OrdnanceSurvey", minZoom: 12, maxZoom: 18, maxNativeZoom: 17});
        map.addLayer(bingOsLayer);
        var fallbackLayer = new leaflet_bing(bingKey, {type: "Road", maxZoom: 11, minZoom: 0});
        map.addLayer(fallbackLayer);

        // starting point doesn't have any particular relevance at the moment, but there are less scenic places to go
        map.setView(new leaflet.LatLng(53.374694, -1.711474), 13);
        
        if (mobile.isMobile()) {
        	screenposition_osgb().addTo(map);
        } else {
        	mouseposition_osgb().addTo(map);
        }

        return {
            getMap: function() {
                return map;
            }
        };
    }
);
