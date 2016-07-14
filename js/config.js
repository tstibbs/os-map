define(["jquery"],
    function($) {
		var defaults = {
			cluster: true,
			dimensional_layering: false,
			initial_zoom: 13,
			start_position: [53.374694, -1.711474]//lat, long
		};
		
		var overrides = window.os_map_config;
		var config = $.extend({}, defaults, overrides);
		
        return config;
    }
);
