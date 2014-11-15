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
            return dataCreateService.createPerson(vm.person).then(function(response) {
                if (response.is_valid){
                    authService.setUserIdentityProperty('role', response.action_result.role);
                    routehelper.redirectToRoute('dashboard');
                } else{
                    logger.warning("Register failed");
                }
            });
        };

        activate();

        function activate() {
            logger.info('Activated Register Person View');
        }
    }
})();