define(["leaflet", "leaflet_bing", "leaflet_controlHider", "selection", "locate", "mouseposition_osgb", "screenposition_osgb", "mobile", "config"],
	function(leaflet, leaflet_bing, Leaflet_ControlHider, Selection, locate, mouseposition_osgb, screenposition_osgb, mobile, Config) {
	
		var bingKey = "LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc";
	
		var OsMap = leaflet.Class.extend({
			initialize: function (config) {
				this._config = config;
				// set up the map
				this._map = new leaflet.Map(this._config.map_element_id, {
					zoomControl: false
				});
				this._initControls();

				// create bing layers
				var bingOsLayer = new leaflet_bing(bingKey, {type: "OrdnanceSurvey", minZoom: 12, maxZoom: 18, maxNativeZoom: 17});
				this._map.addLayer(bingOsLayer);
				var fallbackLayer = new leaflet_bing(bingKey, {type: "Road", maxZoom: 11, minZoom: 0});
				this._map.addLayer(fallbackLayer);
				this._map.setView(new leaflet.LatLng(this._config.start_position[0], this._config.start_position[1]), this._config.initial_zoom);
				
				//hook up listener to save the location when we move it
				this._map.on('zoomend moveend dragend', function() {
					this._saveLocation();
				}, this);
				
				//position displays
				if (mobile.isMobile()) {
					screenposition_osgb().addTo(this._map);
				} else {
					mouseposition_osgb().addTo(this._map);
				}
			},
			
			_initControls: function() {
				var controls = [];
				controls[0] = new leaflet.Control.Zoom();
				controls[1] = new Selection();
				if (this._config.show_locate_control) {
					controls.push(locate());
				}
				
				//add hider _first_, then everything else
				if (mobile.isMobile()) {
					var hider = new Leaflet_ControlHider(controls);
					hider.addTo(this._map);
				}
				
				controls.forEach(function(control) {
					control.addTo(this._map);
				}.bind(this));
			},
			
			_saveLocation: function() {
				var center = this._map.getCenter();
				var start_position = [center.lat, center.lng];
				var initial_zoom = this._map.getZoom();
				if (localStorage !== undefined) {
					var hash = {
						start_position: start_position,
						initial_zoom: initial_zoom
					};
					this._config.persist(hash);
				}
			},

			getMap: function () {
				return this._map;
			}
		});

		return OsMap;
	}
);
