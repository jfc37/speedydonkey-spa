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
        vm.isAuthenticated = authService.isAuthenticated;
        vm.profile = authService.profile;
        vm.loginUrl = '#/login';
        vm.manageUserUrl = '#/manageUser';
        vm.logout = function () {
            authService.logout();
            routehelper.redirectToRoute('login');
        };

        activate();

        function activate() {
            if (!vm.isAuthenticated()) {
                angular.element('body').addClass('canvas-menu');
            }
        }
    }
})();
