(function () {
    'use strict';

    angular
        .module('app.common.logon')
        .controller('Login', Login);

    Login.$inject = ['logger'];

    /* @ngInject */
    function Login(logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Login';

        activate();

        function activate() {
            logger.info('Activated Login View');
        }
    }
})();