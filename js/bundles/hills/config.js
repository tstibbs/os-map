define(['leaflet', './points_builder'],
	function(leaflet, PointsBuilder) {

		return {
			dimensionNames: ['Hills'],
			dataToLoad: 'data.json',
			parser: PointsBuilder
		};
	}
);
