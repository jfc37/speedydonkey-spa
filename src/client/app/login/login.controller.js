(function () {
    'use strict';

    angular
        .module('app.logon')
        .controller('Login', Login);

    /* @ngInject */
    function Login(config, authService, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Login';
        vm.forgottenPasswordUrl = '#/forgottenPassword';
        vm.registerUrl = '#/register/user';
        vm.company = config.appTitle;

        vm.login = openLoginBox();

        function openLoginBox() {
            authService.login().then(function () {
                routehelper.redirectToRoute('dashboard');
            });
        }

        openLoginBox();
    }
})();
