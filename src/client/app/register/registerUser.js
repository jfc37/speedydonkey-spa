(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterUser', RegisterUser);

    RegisterUser.$inject = ['registerUserService', 'logger', 'dataCreateService', 'routehelper', 'authService'];

    /* @ngInject */
    function RegisterUser(registerUserService, logger, dataCreateService, routehelper, authService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register User';
        vm.user = {};

        vm.register = function() {
            registerUserService.register().then(function () {
                routehelper.redirectToRoute('registerPerson', {username: vm.user.username});
            }, function () {
                logger.warning("Register failed");
            });
        };

        activate();

        function activate() {
            logger.info('Activated Register User View');
        }
    }
})();