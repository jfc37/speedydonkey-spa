(function () {
    'use strict';

    angular
        .module('app.manageUser')
        .factory('manageUserService', manageUserService);

    manageUserService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'authService'];

    /* @ngInject */
    function manageUserService($q, logger, dataservice, dataUpdateService, authService){

        var service = {
            getUser: getUser,
            updateUser: updateUser
        };

        function getUser() {
            return $q(function (resolve, revoke) {
                dataservice.getCurrentUser().then(function (user) {
                    resolve(user);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function updateUser(user) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateUser(user).then(function () {
                    authService.login(user.email, user.password).then(function() {
                        resolve(user);
                    });
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