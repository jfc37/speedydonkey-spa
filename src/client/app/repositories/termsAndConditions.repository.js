(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('termsAndConditionsRepository', termsAndConditionsRepository);

    /* @ngInject */
    function termsAndConditionsRepository(simpleApiCaller, settingsRepository, validationPromise) {
        var service = {
            get: get,
            agree: agree
        };

        return service;

        function get() {
            return settingsRepository.get('termsAndConditions');
        }

        function agree() {
            return simpleApiCaller.post(getOptions()).then(function (response) {
                return response.data;
            }, function (response) {
                return validationPromise.reject(response);
            });
        }

        function getOptions() {
            var options = {
                resource: 'users/current/terms-and-conditions'
            };

            return options;
        }
    }
})();
