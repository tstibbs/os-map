$.get('down-flash.php' + window.location.search, function(data) {
    var decodedXmlString = decodeURIComponent(data);
    var dom = $($.parseXML(decodedXmlString));
    var points = "";
    dom.find('C').each(function(i, element) {
		if (points.length > 0) {
			points = points + ";";
		}
		//e.g. <C D='Castlebythe Barrow' I='2041' E='202873' N='229647' F='n'/>
		var point = $(element);
		var name = point.attr('D');
		var eastings = point.attr('E');
		var northings = point.attr('N');
		points = points + eastings + "," + northings;
    });
    window.location="http://tstibbs.github.io/os-map/index.html?trigs=" + encodeURIComponent(points);
});
