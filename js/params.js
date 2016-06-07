define([],
    function() {
	
		var params = {};
		var search = window.location.search;
		if (search.length > 0) {
			search = search.substr(1);
			var paramString = search.split("&")
			paramString.forEach(function (item) {
				var tmp = item.split("=");
				params[tmp[0]] = decodeURIComponent(tmp[1]);
			});
		}

        return function (key) {
            return params[key];
        }
    }
);
