define(["leaflet"],
    function(leaflet) {
        // set up the map
        var map = new leaflet.Map('map');

        // create the tile layer with correct attribution
        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new leaflet.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});		

        // start the map in South-East England
        map.setView(new leaflet.LatLng(51.3, 0.7),9);
        map.addLayer(osm);
    }
);
