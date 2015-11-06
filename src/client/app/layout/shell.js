(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell($timeout, config, logger, authService, routehelper, auth) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = config.appTitle;
        vm.isAuthenticated = authService.isAuthenticated;
        vm.profile = authService.profile;
        vm.loginUrl = '#/login';
        vm.registerUrl = '#/register/user';
        vm.manageUserUrl = '#/manageUser';
        vm.logout = function () {
            auth.signout();
            routehelper.redirectToRoute('login');
        };
        vm.showSideBar = function () {
            return authService.isAuthenticated();
        };

        activate();

        function activate() {
            if (!vm.showSideBar()) {
                angular.element('body').addClass('canvas-menu');
            }
        }
    }
})();
