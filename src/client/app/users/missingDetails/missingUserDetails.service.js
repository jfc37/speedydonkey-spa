(function () {
    'use strict';

    angular
        .module('app.users')
        .factory('missingUserDetailsService', missingUserDetailsService);

    /* @ngInject */
    function missingUserDetailsService($q, simpleApiCaller, missingUserDetailsModal) {
        var service = {
            performCheck: performCheck
        };

        return service;

        function performCheck() {
            var deferred = $q.defer();

            simpleApiCaller.get(getOptions()).then(function (response) {
                var user = response.data;

                if (user.firstName && user.surname) {
                    deferred.resolve();
                } else {
                    missingUserDetailsModal.open(user).finally(deferred.resolve);
                }

            });

            return deferred.promise;
        }

        function getOptions() {
            return {
                resource: 'users/current/names'
            };
        }
    }
})();
