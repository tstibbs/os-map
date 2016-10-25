define(["leaflet", "leaflet_controlHider", "selection", "locate", "mobile", "leaflet_matrixlayers"],
	function(leaflet, Leaflet_ControlHider, Selection, Locate, mobile, Leaflet_MatrixLayers) {

		//even if some items aren't used in this particular configuration, we'll stick to a given order (resulting gaps are fine)
		var order = [Leaflet_ControlHider, leaflet.Control.Zoom, Locate, Leaflet_MatrixLayers, Selection];
	
		var Controls = leaflet.Class.extend({
			initialize: function(show_locate_control) {
				this._controlsToHide = [];
				this._controlsToAdd = [];
				this._show_locate_control = show_locate_control;
				this._addDefaults();
			},
			
			_addDefaults: function() {
				this.addControl(new leaflet.Control.Zoom(), true);
				this.addControl(new Selection());
				if (mobile.isMobile()) {
					this.addControl(new Leaflet_ControlHider(this._controlsToHide), false);
				}
				if (this._show_locate_control) {
					this.addControl(new Locate());
				}
			},
			
			addControl: function(control) {
				var found = false;
				for (var i = 0; i < order.length; i++) {
					if (control instanceof order[i]) {
						if (this._controlsToAdd[i] != null) {
							console.error('Overwriting existing control "' + this._controlsToAdd[i] + '" with "' + control + '".');
						}
						this._controlsToAdd[i] = control;
						if (!(control instanceof Leaflet_ControlHider)) {
							this._controlsToHide.push(control);
						}
						found = true;
						break;
					}
				}
				if (!found) {
					console.error("Unrecognised control: " + control);
					this._controlsToHide.push(control);
					this._controlsToAdd[Math.max(order.length, this._controlsToAdd.length)] = control;
				}
			},
			
			addAllTo: function(map) {
				this._controlsToAdd.forEach(function(control) {
					if (control != null) {
						control.addTo(map);
					}
				}.bind(this));
			}
		});

		return Controls;
	}
);
