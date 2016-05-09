define(["leaflet", "leaflet_bing"],
    function(leaflet, leaflet_bing) {
        // set up the map
        var map = new leaflet.Map('map');

        // create bing layer
        var bingKey = "LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc";
        var bingOsLayer = new leaflet_bing(bingKey, {type: "OrdnanceSurvey", maxNativeZoom: 17});
        map.addLayer(bingOsLayer);

        // start the map in South-East England
        map.setView(new leaflet.LatLng(51.3, 0.7),9);
    }
);
