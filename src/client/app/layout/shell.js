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
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.showSplash = true;
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
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
        }

        function hideSplash() {
            //TODO: Force a 1 second delay so we can see the splash.
            $timeout(function () {
                vm.showSplash = false;
            }, 1000);
        }
    }
})();
