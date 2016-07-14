//declare utility function outside of requirejs that will boot requirejs, so that we have minimal js in each html file
function loadOsMap(callback) {
    require([window.os_map_base + 'js/app'], function() {
        require(['main'], function(main) {
            callback(main);
        });
    });
}
