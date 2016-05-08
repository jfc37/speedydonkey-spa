(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .factory('passOptionRepository', passOptionRepository);

    /* @ngInject */
    function passOptionRepository($q, simpleApiCaller, validationPromise) {

        var service = {
            create: create,
            update: update,
            delete: deletePassOptions,
            getAll: getAll,
            get: get
        };

        function create(passOption) {
            return simpleApiCaller.post(passOption, getOptions()).then(function () {

            }, function (response) {
                return validationPromise.reject(response);
            });
        }

        function update(passOption) {
            return simpleApiCaller.put(passOption, getOptions(passOption.id)).then(function () {

            }, function (response) {
                return validationPromise.reject(response);
            });
        }

        function deletePassOptions(passOptions) {
            var allRequests = [];

            passOptions.forEach(function (passOption) {
                allRequests.push(deletePassOption(passOption.id));
            });

            return $q.all(allRequests);
        }

        function deletePassOption(id) {
            return simpleApiCaller.delete(getOptions(id));
        }

        function getAll() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.status === 404) {
                    return [];
                }
            });
        }

        function get(id) {
            return simpleApiCaller.get(getOptions(id)).then(function (response) {
                return response.data;
            });
        }

        function getOptions(id) {
            var options = {
                resource: 'pass-templates'
            };

            if (id) {
                options.id = id;
            }

            return options;
        }

        return service;

    }
})();
