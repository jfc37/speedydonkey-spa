(function () {
    'use strict';

    angular
        .module('app.userActivation')
        .factory('userActivationService', userActivationService);

    userActivationService.$inject = ['$q', '$routeParams', 'dataUpdateService', 'authService'];

    /* @ngInject */
    function userActivationService($q, $routeParams, dataUpdateService){

        var service = {
            activate: activate
        };

        function activate() {
            return $q(function (resolve, revoke) {
                dataUpdateService.activateUser($routeParams.key).then(resolve, revoke);
            });
        }

        return service;

    }
})();