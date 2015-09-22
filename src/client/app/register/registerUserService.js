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
                    if (response.validation_result !== undefined) {
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        return service;

    }
})();
