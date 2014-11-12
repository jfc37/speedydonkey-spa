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
            return dataservice.getUserFromCredentials(vm.username, vm.password).then(function (data) {
                if (data === null){
                    authService.logout();
                    logger.warning("Login failed");
                } else{
                    logger.success("Login successful");
                    routehelper.redirectToRoute('dashboard');
                }
            });
        }

        activate();

        function activate() {
            logger.info('Activated Login View');
        }
    }
})();