define(['leaflet', './points_builder'],
	function(leaflet, PointsBuilder) {

		return {
			dimensionNames: ['Hills'],
			dimensionValueLabels: {
				'Hills': {
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
				}
			},
			dataToLoad: 'data.json',
			parser: PointsBuilder
		};
	}
);
