requirejs.config({
    baseUrl: "js",
    paths: {
		leaflet: 'http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet',
		leaflet_bing: 'http://cdnjs.cloudflare.com/ajax/libs/leaflet-plugins/1.6.0/layer/tile/Bing',
		proj4: 'http://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.14/proj4',
		leaflet_mouseposition: '../lib/js/leaflet_mouseposition'
    },
    shim: {
        leaflet: {
            exports: 'L'
        },
        leaflet_bing: {
            deps: ['leaflet'],
            exports: 'L.BingLayer'
        },
        leaflet_mouseposition: {
            deps: ['leaflet'],
            exports: 'L.control.mousePosition'
        },
        proj4js: {
            exports: 'module.exports'
        }
    }
});

requirejs(['main'])();
