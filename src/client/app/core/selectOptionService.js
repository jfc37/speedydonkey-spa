(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('selectOptionService', selectOptionService);

    selectOptionService.$inject = [];

    /* @ngInject */
    function selectOptionService() {
        var service = {
            getPassTypes: getPassTypes
        };

        function getPassTypes() {
            return [
                {
                    display: 'Clip',
                    value: 'clip'
                },
                {
                    display: 'Unlimited',
                    value: 'unlimited'
                },
            ];
        }

        return service;
    }
})();