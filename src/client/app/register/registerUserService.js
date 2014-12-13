(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('registerUserService', registerUserService);

    registerUserService.$inject = ['$q', 'logger', 'dataCreateService', 'authService'];

    /* @ngInject */
    function registerUserService($q, logger, dataCreateService, authService){

        var service = {
            register: register
        };

        function register(user) {
            return $q(function (resolve, revoke) {
                dataCreateService.createUser(user).then(function (createdUser) {
                    authService.login(user.username, user.password);
                    authService.setUserIdentityProperty('userId', createdUser.id);
                    resolve();
                }, function (response) {
                    if (response.validation_result !== undefined){
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