(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataCreateService', dataCreateService);

    dataCreateService.$inject = ['$q', 'apiCaller', 'authService', 'dateService'];

    /* @ngInject */
    function dataCreateService($q, apiCaller, authService, dateService) {
        var service = {
            createUser: createUser,
            createPassOption: createPassOption
        };

        return service;

        function createUser(user) {
            return $q(function (resolve, reject) {
                apiCaller.postUser(user).success(function(response) {
                    resolve(response.action_result);
                }).error(function(response) {
                    reject(response);
                });
            });
        }

        function createPassOption(passOption) {
            return $q(function (resolve, reject) {
                apiCaller.postPassOption(passOption).success(function(response) {
                    resolve(response.action_result);
                }).error(function(response) {
                    reject(response);
                });
            });
        }
    }
})();