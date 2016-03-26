(function () {
    'use strict';

    angular
        .module('app.users')
        .factory('termsAndConditionsService', termsAndConditionsService);

    /* @ngInject */
    function termsAndConditionsService($q, currentUserRepository, termsAndConditionsModal) {
        var service = {
            performCheck: performCheck
        };

        return service;

        function performCheck() {
            var deferred = $q.defer();

            currentUserRepository.get().then(function (user) {
                if (user.agreesToTerms) {
                    deferred.resolve();
                } else {
                    termsAndConditionsModal.open().finally(deferred.resolve);
                }
            });

            return deferred.promise;
        }
    }
})();
