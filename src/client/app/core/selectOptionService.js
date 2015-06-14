(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('selectOptionService', selectOptionService);

    selectOptionService.$inject = [];

    /* @ngInject */
    function selectOptionService() {
        var service = {
            getPassTypes: getPassTypes,
            getAnnouncementTypes: getAnnouncementTypes
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

        function getAnnouncementTypes() {
            return [
                {
                    display: 'Dashboard Banner',
                    value: 'banner'
                },
                {
                    display: 'Email',
                    value: 'email'
                }
            ];
        }

        return service;
    }
})();
