define(["jquery"],
    function($) {
		var defaults = {
			cluster: true,
			dimensional_layering: false
		};
		
		var overrides = window.os_map_config;
		var config = $.extend({}, defaults, overrides);
		
        return config;
    }
);
