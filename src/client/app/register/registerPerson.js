(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterPerson', RegisterPerson);

    RegisterPerson.$inject = ['logger', 'registerPersonService', 'routehelper', 'validationService'];

    /* @ngInject */
    function RegisterPerson(logger, registerPersonService, routehelper, validationService) {
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

        vm.register = function(form) {
            registerPersonService.register(vm.person).then(function () {
                routehelper.redirectToRoute('dashboard');
            }, function (validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
            });
        };

        activate();

        function activate() {
            logger.info('Activated Register Person View');
        }
    }
})();