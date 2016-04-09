(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('currentUserRepository', currentUserRepository);

    /* @ngInject */
    function currentUserRepository(simpleApiCaller) {
        var service = {
            get: get
        };

        return service;

        function get() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                return response.data;
            });
        }

        function getOptions() {

            var options = {
                resource: 'users/current'
            };

            return options;
        }
    }
})();
