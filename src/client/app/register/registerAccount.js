(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterAccount', RegisterAccount);

    RegisterAccount.$inject = ['registerAccountService', 'logger', 'routehelper', 'validationService'];

    /* @ngInject */
    function RegisterAccount(registerAccountService, logger, routehelper, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register Account';
        vm.account = {};

        vm.register = function(form) {
            registerAccountService.register(vm.account).then(function () {
                routehelper.redirectToRoute('registerPerson');
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