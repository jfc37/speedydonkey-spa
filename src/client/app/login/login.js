(function () {
    'use strict';

    angular
        .module('app.logon')
        .controller('Login', Login);

    Login.$inject = ['dataservice', 'logger', 'authService', 'routehelper'];

    /* @ngInject */
    function Login(dataservice, logger, authService, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Login';

        vm.submit = function(){
            authService.login(vm.username, vm.password);
            //Need to call api it ensure username and password were actually correct
            return dataservice.searchForUser({username: vm.username}, successfulUserSearch, failedLogin);
        }

        activate();

        function activate() {
            logger.info('Activated Login View');
        }

        function successfulUserSearch(results) {
            if (results.length === 1) {
                var user = results[0];
                authService.setUserIdentityProperty('role', user.person.role);
                authService.setUserIdentityProperty('userId', user.id);
                authService.setUserIdentityProperty('personId', user.person.id);
                logger.success("Login successful");
                routehelper.redirectToRoute('dashboard');
            } else {
                failedLogin();
            }
        }

        function failedLogin() {
            authService.logout();
            logger.warning("Login failed");
        }
    }
})();