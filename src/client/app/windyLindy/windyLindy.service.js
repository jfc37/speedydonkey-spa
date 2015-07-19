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
                    resource: 'windy-lindy'
                };
                simpleApiCaller.post(registration, options).then(function (response) {
                    resolve('123-123-123');
                    //resolve(reponse.action_result.id);
                });
            });

        }

        function getRegistration(id) {

            return $q(function (resolve, revoke) {

                var options = {
                    resource: 'windy-lindy',
                    id: id,
                    block: true
                };
                var dummy = {
                    type: 'Full Pass',
                    amount: 199.99,
                    id: 1
                };
                simpleApiCaller.get(options).then(function (response) {
                    resolve(dummy);
                    //resolve(response);
                }, function () {
                    resolve(dummy);
                });

            });

        }

        return service;

    }
})();
