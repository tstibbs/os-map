define(["leaflet", "leaflet_bing", "mouseposition_osgb"],
    function(leaflet, leaflet_bing, mouseposition_osgb) {
        // set up the map
        var map = new leaflet.Map('map');

        // create bing layers
        var bingKey = "LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc";
        var bingOsLayer = new leaflet_bing(bingKey, {type: "OrdnanceSurvey", minZoom: 12, maxZoom: 18, maxNativeZoom: 17});
        map.addLayer(bingOsLayer);
        var fallbackLayer = new leaflet_bing(bingKey, {type: "Road", maxZoom: 11, minZoom: 0});
        map.addLayer(fallbackLayer);
        
        mouseposition_osgb().addTo(map);

        // start the map in South-East England
        map.setView(new leaflet.LatLng(51.3, 0.7), 13);
    }
);
