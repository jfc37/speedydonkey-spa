(function () {
    'use strict';

    angular
        .module('app.windyLindy')
        .factory('windyLindyService', windyLindyService);

    windyLindyService.$inject = ['$q', 'simpleApiCaller'];

    /* @ngInject */
    function windyLindyService($q, simpleApiCaller) {

        var service = {
            submitRegistration: submitRegistration,
            getRegistration: getRegistration
        };

        function submitRegistration(registration) {

            return $q(function (resolve, revoke) {
                var options = {
                    resource: 'windy-lindy/registration'
                };
                simpleApiCaller.post(registration, options).then(function (response) {
                    resolve(response.data.action_result.registation_id);
                });
            });

        }

        function getRegistration(id) {

            return $q(function (resolve, revoke) {

                var options = {
                    resource: 'windy-lindy/registration',
                    id: id,
                    block: true
                };
                simpleApiCaller.get(options).then(function (response) {
                    resolve(response.data);
                });

            });

        }

        return service;

    }
})();
