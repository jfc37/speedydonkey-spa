(function () {
    'use strict';

    angular
        .module('app.settings')
        .factory('settingsService', settingsService);

    /* @ngInject */
    function settingsService() {

        var service = {
            getAll: getAll
        };

        function getAll() {
            return {};
        }

        return service;

    }
})();
