(function () {
    'use strict';

    angular
        .module('app.common.logon')
        .controller('Login', Login);

    Login.$inject = ['dataservice', 'logger', 'authService'];

    /* @ngInject */
    function Login(dataservice, logger, authService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Login';

        vm.submit = function(){
            authService.setCredentials(vm.username, vm.password);
            return dataservice.getUserFromCredentials(vm.username, vm.password).then(function (data) {
                if (data === null){
                    authService.clearCredentials();
                    logger.warning("Login failed");
                } else{
                    logger.success("Login successful");
                }
            });
        }

        activate();

        function activate() {
            logger.info('Activated Login View');
        }
    }
})();