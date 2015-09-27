(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('passService', passService);

    /* @ngInject */
    function passService($q, simpleApiCaller) {

        var service = {
            getCurrentUsersPasses: getCurrentUsersPasses
        };

        function getCurrentUsersPasses() {
            var options = {
                resource: 'users/current/passes'
            };
            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.status === 404) {
                    return [];
                } else {
                    return $q.reject();
                }
            });
        }

        return service;
    }
})();
