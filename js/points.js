define(["proj4", "leaflet", "os_map", "conversion"],
    function(proj4, leaflet, os_map, conversion) {
        return function (eastings, northings) {
            var out = conversion.osgbToLatLng(eastings, northings);
            var lng = out[0];
            var lat = out[1];
            leaflet.marker([lat, lng]).addTo(os_map.getMap());
        }
    }
);
