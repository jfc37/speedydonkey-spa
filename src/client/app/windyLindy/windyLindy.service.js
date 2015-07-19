(function () {
    'use strict';

    angular
        .module('app.windyLindy')
        .factory('windyLindyService', windyLindyService);

    windyLindyService.$inject = ['$q', 'simpleApiCaller'];

    /* @ngInject */
    function windyLindyService($q, simpleApiCaller) {

        var service = {
            submitRegistration: submitRegistration
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

        return service;

    }
})();
