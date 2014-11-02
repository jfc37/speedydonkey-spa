(function () {
    'use strict';

    angular
        .module('app.common.logon')
        .controller('Login', Login);

    Login.$inject = ['dataservice', 'logger'];

    /* @ngInject */
    function Login(dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Login';

        vm.submit = function(){
            return dataservice.checkUserCredentials(vm.username, vm.password).then(function (data) {
                if (data === null){
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