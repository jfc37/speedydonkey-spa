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
            return dataCreateService.createUser(vm.user).then(function(response) {
                if (response.is_valid) {
                    authService.login(vm.user.username, vm.user.password);
                    routehelper.redirectToRoute('registerPerson', {username: response.action_result.username});
                } else {
                    logger.warning("Register failed");
                }
            });
        };

        activate();

        function activate() {
            logger.info('Activated Register User View');
        }
    }
})();