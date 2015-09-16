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
            getRegistration: getRegistration,
            getAllRegistrations: getAllRegistrations
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

        function getAllRegistrations() {

            return $q(function (resolve, revoke) {

                var options = {
                    resource: 'windy-lindy/registrations',
                    block: true
                };
                simpleApiCaller.get(options).then(function (response) {

                    response.data.forEach(function (reg) {
                        reg.full_name = reg.first_name + ' ' + reg.surname;
                        reg.pass_type = reg.full_pass ? 'Full Pass' : 'Partial Pass';
                    });

                    resolve(response.data);
                });

            });

        }

        return service;

    }
})();
