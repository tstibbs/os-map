define(['leaflet', 'bundles/hills/points_builder'],
	function(leaflet, PointsBuilder) {

		return {
			dimensionNames: ['Hills'],
			dataToLoad: 'hills.js',
			parser: PointsBuilder
		};
	}
);
