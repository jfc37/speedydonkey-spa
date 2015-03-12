(function () {
    'use strict';

    angular
        .module('app.logon')
        .controller('Login', Login);

    Login.$inject = ['logger', 'authService', 'routehelper', 'validationService'];

    /* @ngInject */
    function Login(logger, authService, routehelper, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Login';

        vm.submit = function(form){
            authService.login(vm.email, vm.password).then(function() {
                routehelper.redirectToRoute('dashboard');
            }, function(validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
            });
        };

        activate();

        function activate() {
            logger.info('Activated Login View');
        }
    }
})();