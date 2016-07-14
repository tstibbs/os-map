define(["leaflet", "jquery"],
    function(leaflet, $) {
		var defaults = {
			cluster: true,
			dimensional_layering: false,
			initial_zoom: 13,
			start_position: [53.374694, -1.711474],//lat, long
			map_element_id: 'map'
		};

		var Config = leaflet.Class.extend({
			initialize: function (options) {
				var config = $.extend({}, defaults, options);
				for (var property in config) {
					if (config.hasOwnProperty(property)) {
						this[property] = config[property];
					}
				}
			}
		});

		return Config;
    }
);
