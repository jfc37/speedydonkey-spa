(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterUser', RegisterUser);

    RegisterUser.$inject = ['logger', 'dataCreateService', 'routehelper'];

    /* @ngInject */
    function RegisterUser(logger, dataCreateService, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register User';
        vm.user = {};

        vm.register = function() {
            return dataCreateService.createUser(vm.user).then(function(response) {
                if (response.is_valid){
                    routehelper.redirectToRoute('registerPerson', {username: response.action_result.username});
                } else {
                    logger.warning("Register failed");
                }
            });
        };

        activate();

        function activate() {
            logger.info('Activated Register User View');
        }
    }
})();