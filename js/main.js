define(["leaflet", "leaflet_bing", "mouseposition_osgb"],
    function(leaflet, leaflet_bing, mouseposition_osgb) {
        // set up the map
        var map = new leaflet.Map('map');

        // create bing layer
        var bingKey = "LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc";
        var bingOsLayer = new leaflet_bing(bingKey, {type: "OrdnanceSurvey", maxNativeZoom: 17});
        map.addLayer(bingOsLayer);
        var fallbackLayer = new leaflet_bing(bingKey, {type: "Road"});
        map.addLayer(fallbackLayer);
        //auto switch between layers on zoom to ensure we're showing something sensible
        map.on('zoomend', function(e) {
            var zoom = map.getZoom();
            if (zoom < 12) {
                //show roads
                if (map.hasLayer(bingOsLayer)) {
                    map.removeLayer(bingOsLayer);
                }
                if (!map.hasLayer(fallbackLayer)) {
                    map.addLayer(fallbackLayer);
                }
            } else {
                //show OS - this means expanding the tiles when zoomed far in, but that's better than showing roads
                if (!map.hasLayer(bingOsLayer)) {
                    map.addLayer(bingOsLayer);
                }
                if (map.hasLayer(fallbackLayer)) {
                    map.removeLayer(fallbackLayer);
                }
            }
        });
        
        mouseposition_osgb().addTo(map);

        // start the map in South-East England
        map.setView(new leaflet.LatLng(51.3, 0.7), 13);
    }
);
