(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell($timeout, config, logger, authService, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = config.appTitle;
        vm.getUserIdentity = authService.getUserIdentity;
        vm.loginUrl = '#/login';
        vm.registerUrl = '#/register/user';
        vm.manageUserUrl = '#/manageUser';
        vm.logout = function () {
            authService.logout();
            routehelper.redirectToRoute('login');
        };
        vm.showSideBar = function () {
            return vm.getUserIdentity().isLoggedIn;
        };

        activate();

        function activate() {
            if (!vm.showSideBar()) {
                angular.element('body').addClass('canvas-menu');
            }
        }
    }
})();
