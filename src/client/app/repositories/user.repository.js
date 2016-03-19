(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userRepository', userRepository);

    /* @ngInject */
    function userRepository(simpleApiCaller, validationPromise) {
        var service = {
            get: get,
            getAll: getAll,
            create: create,
            delete: remove
        };

        return service;

        function get(id) {
            return simpleApiCaller.get(getOptions(id)).then(function (response) {
                return response.data;
            });
        }

        function getAll() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                return response.data;
            });
        }

        function create(user) {
            return simpleApiCaller.post(user, getOptions()).then(function (response) {
                return response.data.actionResult;
            }, function (response) {
                return validationPromise.reject(response);
            });
        }

        function remove(user) {
            return simpleApiCaller.delete(getOptions(user.id));
        }

        function getOptions(id) {

            var options = {
                resource: 'users'
            };

            if (id) {
                options.id = id;
            }

            return options;
        }
    }
})();
