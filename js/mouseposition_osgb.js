define(["leaflet_mouseposition", "proj4js", "conversion"],
    function(leaflet_mouseposition, proj4js, conversion) {
        return function(options) {
			if (options == undefined || options == null) {
				options = {};
			}
			options.latLngFormatter = function (lat, lng) {
				//TODO don't redeclare this every time
				var osgbProj = "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs";
				var out = proj4js(osgbProj,[lng, lat ]);
				return conversion(out[0], out[1], 10);
			}
			
			return leaflet_mouseposition(options);
        }
    }
);