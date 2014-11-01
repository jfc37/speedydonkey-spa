(function () {
    'use strict';

    angular
        .module('app.common.logon')
        .controller('Register', Register);

    Register.$inject = ['logger'];

    /* @ngInject */
    function Register(logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register';

        activate();

        function activate() {
            logger.info('Activated Register View');
        }
    }
})();