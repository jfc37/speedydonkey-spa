(function () {
    'use strict';

    angular
        .module('app.register')
        .factory('registerPersonService', registerPersonService);

    registerPersonService.$inject = ['$q', 'dataCreateService', 'authService'];

    /* @ngInject */
    function registerPersonService($q, dataCreateService, authService) {
        /*jshint validthis: true */
        
        var service = {
            register: register
        };

        function register(person) {
            return $q(function (resolve, revoke) {
                dataCreateService.createPerson(person).then(function (createdPerson) {
                    authService.setUserIdentityProperty('personId', createdPerson.id);
                    authService.setUserIdentityProperty('role', createdPerson.role);
                    resolve(createdPerson);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        };

        return service;
    }
})();