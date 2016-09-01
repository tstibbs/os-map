// This file must have no dependencies and must be loaded first, so it can warn of any issues loading dependent libraries

var functionsToWrap = ['log', 'error', 'warn'];

var outerThis = this;

function displayError() {
	var elem = document.createElement('p');
	elem.className = 'error';
	var args = Array.prototype.slice.call(arguments);
	var message = args.join(" | ");
	elem.innerHTML = message;
	var container = document.getElementById('error-container');
	container.appendChild(elem);
	container.style.display = 'block'; //may already be showing, but that's fine
}

if (window.console != null) {
	for (var i = 0; i < functionsToWrap.length; i++) {
		var func = functionsToWrap[i];
		if (window.console[func] != null) {
			(function(func, old) {//scoping old
				window.console[func] = function() {
					old.apply(this, arguments);//log first in case our displayer mucks something up
					displayError.apply(outerThis, arguments);
				}
			})(func, window.console[func]);
		}
	}
}

window.onerror = function (message, file, line, col, error) {
	displayError.apply(outerThis, [message, file, error]);
};
window.addEventListener("error", function (e) {
	displayError.apply(outerThis, e);
});
