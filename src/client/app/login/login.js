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
            return authService.login(vm.username, vm.password).then(function() {
                    routehelper.redirectToRoute('dashboard');
            });
        }

        activate();

        function activate() {
            logger.info('Activated Login View');
        }
    }
})();