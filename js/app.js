requirejs.config({
    baseUrl: "js",
    paths: {
		leaflet: 'http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet',
		leaflet_bing: 'http://cdnjs.cloudflare.com/ajax/libs/leaflet-plugins/1.6.0/layer/tile/Bing'
    },
    shim: {
        leaflet: {
            exports: 'L'
        },
        leaflet_bing: {
            deps: ['leaflet'],
            exports: 'L.BingLayer'
        }
    }
});

requirejs(['main'])();
