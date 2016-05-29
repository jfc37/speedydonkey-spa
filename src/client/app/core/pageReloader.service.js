(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('pageReloader', pageReloader);

    /* @ngInject */
    function pageReloader($route, $window) {

        var service = {
            reload: reload,
            hardReload: hardReload
        };

        return service;

        function reload() {
            $route.reload();
        }

        function hardReload() {
            $window.location.reload();
        }
    }
})();
