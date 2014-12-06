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
            return $q(function (resolve, reject) {
                dataCreateService.createUser(user).then(function (response) {
                    authService.login(user.username, user.password);
                    authService.setUserIdentityProperty('userId', response.data.id);
                    resolve();
                }, function (response) {
                    reject();
                });
            });
        }

        return service;

    }
})();