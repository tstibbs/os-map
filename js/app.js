requirejs.config({
    baseUrl: "js",
    paths: {
		leaflet: 'http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet',
		leaflet_bing: 'http://cdnjs.cloudflare.com/ajax/libs/leaflet-plugins/1.6.0/layer/tile/Bing',
		proj4: 'http://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.14/proj4',
		leaflet_mouseposition: 'https://cdn.rawgit.com/tstibbs/Leaflet.MousePosition/b628c7be754c134c63117b3feb75e720a1d20673/src/L.Control.MousePosition',
		leaflet_screenposition: 'https://cdn.rawgit.com/tstibbs/Leaflet.MapCenterCoord/75bf776d3dddf375eab0417eac781d321988133b/src/L.Control.MapCenterCoord'
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
        leaflet_screenposition: {
            deps: ['leaflet'],
            exports: 'L.control.mapCenterCoord'
        },
        proj4js: {
            exports: 'module.exports'
        }
    }
});

requirejs(['main'])();
