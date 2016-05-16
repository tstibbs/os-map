//heavily borrowed from www.movable-type.co.uk/scripts/latlong-gridref.html (MIT licence)
define(["proj4"],
	function(proj4) {
		
		var osgbProj = "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs";

		function pad(num, w) {
			var n = num.toString();
			while (n.length < w) n = '0' + n;
			return n;
		};

		return {
			latLngToGridRef: function(lat, lng) {

				var digits = 10;
				
				var out = proj4(osgbProj, [lng, lat]);//from WSG84
				var eastings = out[0];
				var northings = out[1];

				digits = (digits === undefined) ? 10 : Number(digits);
				if (isNaN(digits)) throw new Error('Invalid precision');

				var e = Number(Number(eastings));
				var n = Number(Number(northings));

				if (isNaN(e) || isNaN(n)) throw new Error('Invalid grid reference');

				// use digits = 0 to return numeric format (in metres)
				if (digits == 0) return pad(e, 6)+','+pad(n, 6);

				// get the 100km-grid indices
				var e100k = Math.floor(e/100000), n100k = Math.floor(n/100000);

				if (e100k<0 || e100k>6 || n100k<0 || n100k>12) return '';

				// translate those into numeric equivalents of the grid letters
				var l1 = (19-n100k) - (19-n100k)%5 + Math.floor((e100k+10)/5);
				var l2 = (19-n100k)*5%25 + e100k%5;

				// compensate for skipped 'I' and build grid letter-pairs
				if (l1 > 7) l1++;
				if (l2 > 7) l2++;
				var letPair = String.fromCharCode(l1+'A'.charCodeAt(0), l2+'A'.charCodeAt(0));

				// strip 100km-grid indices from easting & northing, and reduce precision
				e = Math.floor((e%100000)/Math.pow(10, 5-digits/2));
				n = Math.floor((n%100000)/Math.pow(10, 5-digits/2));

				var gridRef = letPair + ' ' + pad(e, digits/2) + ' ' + pad(n, digits/2);

				return gridRef;
			},

			osgbToLatLng: function(eastings, northings) {
				var out = proj4(osgbProj).inverse([eastings, northings]);//to WSG84
				return out;
			}
		};
	}
);