define(['leaflet'], function(leaflet) {
	
	var dimensionValueKeys = ['Pillar', 'Bolt', 'Surface Block', 'Rivet', 'Buried Block', 'Cut', 'Other', 'Berntsen', 'FBM', 'Intersected Station', 'Disc', 'Brass Plate', 'Active station', 'Block', 'Concrete Ring', 'Curry Stool', 'Fenomark', 'Platform Bolt', 'Cannon', 'Spider', 'Pipe'];
	var dimensionValueLabels = {};

	dimensionValueKeys.forEach(function(value) {
		dimensionValueLabels[value] = '<a href="http://trigpointing.uk/wiki/' + value + '">' + value + '</a>';
	});

	return {
		icons: {
			Pillar: leaflet.icon({
				iconUrl: window.os_map_base + 'img/pillar.png',
				iconAnchor: [10, 40], // point of the icon which will correspond to marker's location
				popupAnchor: [1, -38] // point from which the popup should open relative to the iconAnchor
			}),
			Bolt: leaflet.icon({
				iconUrl: window.os_map_base + 'img/bolt.png',
				iconAnchor: [11, 27],
				popupAnchor: [0, -23]
			}),
		},
		dimensionNames: ['Type', 'Condition'],
		dimensionValueLabels: {
			'Type': dimensionValueLabels
		}
	};
});
