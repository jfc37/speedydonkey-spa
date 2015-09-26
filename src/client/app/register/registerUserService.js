(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('registerUserService', registerUserService);

    /* @ngInject */
    function registerUserService($q, logger, dataCreateService, authService) {

        var service = {
            register: register
        };

        function register(user, ignoreLogin) {
            return $q(function (resolve, revoke) {
                dataCreateService.createUser(user).then(function (createdUser) {
                    resolve(createdUser);
                }, function (response) {
                    if (response.validationResult !== undefined) {
                        revoke(response.validationResult.validationErrors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        return service;

    }
})();
