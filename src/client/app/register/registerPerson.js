(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterPerson', RegisterPerson);

    RegisterPerson.$inject = ['logger', 'dataCreateService'];

    /* @ngInject */
    function RegisterPerson(logger, dataCreateService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register Person';
        vm.person = {};

        vm.register = function() {
            return dataCreateService.createPerson(vm.person).then(function(response) {
                if (response.is_valid){

                } else{
                    logger.warning("Register failed");
                }
            });
        };

        activate();

        function activate() {
            logger.info('Activated Register Person View');
        }
    }
})();