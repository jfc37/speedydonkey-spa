(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userRepository', userRepository);

    /* @ngInject */
    function userRepository(simpleApiCaller, validationPromise) {
        var service = {
            create: create
        };

        return service;

        function create(user) {
            var options = {
                resource: 'users'
            };

            return simpleApiCaller.post(user, options).then(function (response) {
                return response.data.actionResult;
            }, function (response) {
                return validationPromise.reject(response);
            });
        }
    }
})();
