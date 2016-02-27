/*global rg4js*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('pageReloader', pageReloader);

    /* @ngInject */
    function pageReloader($window) {

        var service = {
            reload: reload
        };

        return service;

        function reload() {
            $window.location.reload();
        }
    }
})();
