(function () {
    'use strict';

    angular
        .module('app.logon')
        .controller('Login', Login);

    /* @ngInject */
    function Login(logger, authService, routehelper, validationService, config, auth) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Login';
        vm.forgottenPasswordUrl = '#/forgottenPassword';
        vm.registerUrl = '#/register/user';
        vm.company = config.appTitle;

        vm.submit = function (form) {
            authService.login(vm.email, vm.password).then(function () {
                routehelper.redirectToRoute('dashboard');
            }, function (validationErrors) {
                validationService.applyServerSideErrors(form, validationErrors);
            });
        };

        vm.login = function () {
            auth.signin({}, function (profile, token) {
                routehelper.redirectToRoute('dashboard');
            }, function (error) {
                logger.error('There was an error: ' + error);
            });
        };
    }
})();
