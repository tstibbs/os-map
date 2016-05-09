requirejs.config({
    baseUrl: "js",
    paths: {
		leaflet: 'http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet',
    },
    shim: {
        leaflet: {
            exports: 'L'
        }
    }
});

requirejs(['main'])();
