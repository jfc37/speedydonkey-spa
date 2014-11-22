(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterPerson', RegisterPerson);

    RegisterPerson.$inject = ['logger', 'dataCreateService', 'routehelper', 'authService'];

    /* @ngInject */
    function RegisterPerson(logger, dataCreateService, routehelper, authService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register Person';
        vm.person = {};
        vm.roles = [
            {
                display: 'Student',
                value: 'student'
            },
            {
                display: 'Professor',
                value: 'professor'
            },
        ];

        vm.register = function() {
            return dataCreateService.createPerson(vm.person, successfulRegistration, failedRegistration);
        };

        activate();

        function activate() {
            logger.info('Activated Register Person View');
        }

        function successfulRegistration(person) {
            authService.setUserIdentityProperty('personId', person.id);
            authService.setUserIdentityProperty('role', person.role);
            routehelper.redirectToRoute('dashboard');
        }

        function failedRegistration() {
            logger.warning("Register failed");
        }
    }
})();