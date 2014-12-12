(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterUser', RegisterUser);

    RegisterUser.$inject = ['registerUserService', 'logger', 'routehelper', 'validationService'];

    /* @ngInject */
    function RegisterUser(registerUserService, logger, routehelper, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register User';
        vm.user = {};

        vm.register = function(form) {
            registerUserService.register(vm.user).then(function () {
                routehelper.redirectToRoute('registerPerson', {username: vm.user.username});
            }, function (validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
                logger.warning("Register failed");

            });
        };

        activate();

        function activate() {
            logger.info('Activated Register User View');
        }
    }
})();