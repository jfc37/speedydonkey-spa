(function () {
    'use strict';

    angular
        .module('app.manageUser')
        .factory('manageUserService', manageUserService);

    /* @ngInject */
    function manageUserService($q, logger, dataservice, dataUpdateService) {

        var service = {
            getUser: getUser,
            updateUser: updateUser
        };

        function getUser() {
            return $q(function (resolve, revoke) {
                dataservice.getCurrentUser().then(function (user) {
                    resolve(user);
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
