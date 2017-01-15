define(['leaflet', './points_builder'],
	function(leaflet, PointsBuilder) {

		var dimensionNames = ['Hills'];
		var dimensionValueLabels = {};
		dimensionValueLabels[dimensionNames[0]] = {
			'5': 'Dewey',
			'5D': 'Donald Dewey',
			'5H': 'Highland Five',
			'C': 'Corbett',
			'CouT': 'County Top',
			'D': 'Donald',
			'G': 'Graham',
			'Hew': 'Hewitt',
			'Hu': 'Hump',
			'M': 'Munro',
			'MT': 'Munro Top',
			'Ma': 'Marilyn',
			'N': 'Nutall',
			'SIB': 'Islands (SIBs)',
			'Sim': 'Simm',
			'TU': 'Tump',
			'W': 'Wainwright'
		};
		
		return {
			dimensionNames: dimensionNames,
			dimensionValueLabels: dimensionValueLabels,
			dataToLoad: 'data.json',
			parser: PointsBuilder
		};
	}
);
