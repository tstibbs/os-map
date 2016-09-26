define(["leaflet_screenposition", "conversion", "jquery"],
    function(Leaflet_ScreenPosition, conversion, $) {
        return function() {
			var control = new Leaflet_ScreenPosition({
				onMove: true,
				icon: true,
				latLngFormatter: function (lat, lng) {
					return conversion.latLngToGridRef(lat, lng);
				}
			});
			
			function addShowHideHandling() {
				var $icon = $('div.leaflet-control-mapcentercoord-icon.leaflet-zoom-hide');
				var isIconVisible = false;
				var $control = $('div.leaflet-control-mapcentercoord.leaflet-control');
				
				function hideIcon() {
					$icon.css('visibility', 'hidden');
					isIconVisible = false;
				}
				
				function showIcon() {
					$icon.css('visibility', 'visible');
					isIconVisible = true;
				}
				
				$control.click(function() {
					if (isIconVisible) {
						hideIcon();
					} else {
						showIcon();
					}
				});
				//start with crosshairs hidden
				hideIcon();
			}
			
			return {
				addTo: function(map) {
					control.addTo(map);
					addShowHideHandling();
				}
			};
        };
    }
);
