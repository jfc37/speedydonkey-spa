(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('registerAccountService', registerAccountService);

    registerAccountService.$inject = ['$q', 'logger', 'dataCreateService', 'authService'];

    /* @ngInject */
    function registerAccountService($q, logger, dataCreateService, authService){

        var service = {
            register: register
        };

        function register(account) {
            return $q(function (resolve, revoke) {
                dataCreateService.createAccount(account).then(function (createdAccount) {
                    authService.login(account.email, account.password);
                    authService.setUserIdentityProperty('userId', createdAccount.id);
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