(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('Register', Register);

    Register.$inject = ['logger', 'dataCreateService'];

    /* @ngInject */
    function Register(logger, dataCreateService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register';
        vm.user = {};

        vm.register = function() {
            return dataCreateService.createUser(vm.user).then(function(response) {
                if (response.is_valid){

                } else{
                    logger.warning("Register failed");
                }
            });
        };

        activate();

        function activate() {
            logger.info('Activated Register View');
        }
    }
})();