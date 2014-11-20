(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterUser', RegisterUser);

    RegisterUser.$inject = ['logger', 'dataCreateService', 'routehelper', 'authService'];

    /* @ngInject */
    function RegisterUser(logger, dataCreateService, routehelper, authService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register User';
        vm.user = {};

        vm.register = function() {
            dataCreateService.createUser(vm.user, successfulRegister, failedRegister);
        };

        activate();

        function activate() {
            logger.info('Activated Register User View');
        }

        function successfulRegister(user) {
            authService.login(vm.user.username, vm.user.password);
            routehelper.redirectToRoute('registerPerson', {username: user.username});
        }

        function failedRegister() {
            logger.warning("Register failed");
        }
    }
})();