var urlBase = "";
if (window != null && window.os_map_base !== undefined) {
	urlBase = window.os_map_base;
}

var versions = {
	leaflet: '1.0.0',
	leaflet_bing: '1.6.0',
	proj4: '2.3.14',
	leaflet_cluster: 'v1.0.0-rc.1',
	leaflet_mouseposition: 'b628c7be754c134c63117b3feb75e720a1d20673',
	leaflet_screenposition: 'cc990a672930886aaef55b1a66e651bdaaf27353',
	leaflet_subgroup: '1.0.1',
	leaflet_matrixlayers: '0f54890e8dda8d1d756fc68df2c41f40ede27258',
	leaflet_locate: '0.52.0',
	leaflet_controlHider: 'ef39ae61eaf3976144c938295ee22ebe27fbcaa0',
	leaflet_boxSelector: '25ea3892a8933966ac4c23f59d7d48eb69448f23',
	leaflet_geosearch: '1.0.0',
	file_saver: '1.3.3',
	jquery: '3.0.0',
	Squire: '0.2.1',
	sinon: '1.17.5'
};

var paths = {
	leaflet: 'https://unpkg.com/leaflet@' + versions.leaflet + '/dist/leaflet',
	leaflet_bing: 'http://cdnjs.cloudflare.com/ajax/libs/leaflet-plugins/' + versions.leaflet_bing + '/layer/tile/Bing',
	proj4: 'http://cdnjs.cloudflare.com/ajax/libs/proj4js/' + versions.proj4 + '/proj4',
	leaflet_cluster: 'https://cdn.rawgit.com/Leaflet/Leaflet.markercluster/' + versions.leaflet_cluster + '/dist/leaflet.markercluster-src',
	leaflet_mouseposition: 'https://cdn.rawgit.com/tstibbs/Leaflet.MousePosition/' + versions.leaflet_mouseposition + '/src/L.Control.MousePosition',
	leaflet_screenposition: 'https://cdn.rawgit.com/tstibbs/Leaflet.MapCenterCoord/' + versions.leaflet_screenposition + '/src/L.Control.MapCenterCoord',
	leaflet_subgroup: 'https://unpkg.com/leaflet.featuregroup.subgroup@' + versions.leaflet_subgroup + '/dist/leaflet.featuregroup.subgroup',
	leaflet_matrixlayers: 'https://cdn.rawgit.com/tstibbs/Leaflet.MatrixLayersControl/' + versions.leaflet_matrixlayers + '/src/matrixControl',
	leaflet_locate: 'https://cdn.jsdelivr.net/leaflet.locatecontrol/' + versions.leaflet_locate + '/L.Control.Locate.min',
	leaflet_controlHider: 'https://cdn.rawgit.com/tstibbs/Leaflet.ControlHider/' + versions.leaflet_controlHider + '/src/hider',
	leaflet_boxSelector: 'https://cdn.rawgit.com/tstibbs/Leaflet.BoxSelector/' + versions.leaflet_boxSelector + '/src/selector',
	leaflet_boxSelector_Gpx: 'https://cdn.rawgit.com/tstibbs/Leaflet.BoxSelector/' + versions.leaflet_boxSelector + '/src/gpx',
	leaflet_geosearch: 'https://unpkg.com/leaflet-geosearch@' + versions.leaflet_geosearch + '/src/js/l.control.geosearch',
	leaflet_geosearch_osm: 'https://unpkg.com/leaflet-geosearch@' + versions.leaflet_geosearch + '/src/js/l.geosearch.provider.openstreetmap',
	file_saver: 'https://unpkg.com/file-saver@' + versions.file_saver + '/FileSaver.min',
	jquery: 'https://code.jquery.com/jquery-' + versions.jquery
}

var testingPaths = {
	Squire: 'https://unpkg.com/squirejs@' + versions.Squire + '/src/Squire',
	sinon: 'https://unpkg.com/sinon@' + versions.sinon + '/pkg/sinon'
}

if (window.location.search.indexOf("dev=true") !== -1) {
	paths.leaflet = paths.leaflet + '-src';
	paths.leaflet_matrixlayers = '../../Leaflet.MatrixLayersControl/src/matrixControl';
	paths.leaflet_boxSelector = '../../Leaflet.BoxSelector/src/selector';
	paths.leaflet_boxSelector_Gpx = '../../Leaflet.BoxSelector/src/gpx';
}


requirejs.config({
	baseUrl: urlBase + "js",
	paths: paths,
	shim: {
		leaflet_bing: {
			deps: ['leaflet'],
			exports: 'L.BingLayer'
		},
		leaflet_mouseposition: {
			deps: ['leaflet'],
			exports: 'L.Control.MousePosition'
		},
		leaflet_screenposition: {
			deps: ['leaflet'],
			exports: 'L.Control.MapCenterCoord'
		},
		leaflet_cluster: {
			deps: ['leaflet'],
			exports: 'L.markerClusterGroup'
		},
		leaflet_locate: {
			deps: ['leaflet'],
			exports: 'L.control.locate'
		},
		leaflet_controlHider: {
			deps: ['leaflet'],
			exports: 'L.Control.ControlHider'
		},
		leaflet_geosearch: {
			deps: ['leaflet'],
			exports: 'L.Control.GeoSearch'
		},
		leaflet_geosearch_osm: {
			deps: ['leaflet', 'leaflet_geosearch'],
			exports: 'L.GeoSearch.Provider.OpenStreetMap'
		},
		file_saver: {
			exports: 'saveAs'
		},
		proj4js: {
			exports: 'module.exports'
		}
	}
});
