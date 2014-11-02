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
            return dataservice.checkUserCredentials(vm.username, vm.password).then(function (data) {
                if (data === null){
                    logger.warning("Login failed");
                } else{
                    authService.setCredentials(vm.username, vm.password);
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