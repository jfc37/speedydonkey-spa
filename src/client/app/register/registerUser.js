(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterUser', RegisterUser);

    /* @ngInject */
    function RegisterUser(registerUserService, logger, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register Account';
        vm.newUser = {};
        vm.registrationSuccessful = false;

        vm.registerNewUser = function (form) {
            registerUserService.register(vm.newUser).then(function () {
                vm.registrationSuccessful = true;
            }, function (validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
                logger.warning('Register failed');

            });
        };

        activate();

        function activate() {
            logger.info('Activated Register User View');
        }
    }
})();
