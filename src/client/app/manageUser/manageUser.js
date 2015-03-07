(function () {
    'use strict';

    angular
        .module('app.manageUser')
        .controller('ManageUser', ManageUser);

    ManageUser.$inject = ['registerUserService', 'logger', 'routehelper', 'validationService'];

    /* @ngInject */
    function ManageUser(registerUserService, logger, routehelper, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Manage User';
        vm.user = {};

        vm.register = function(form) {
            registerUserService.register(vm.user).then(function () {
                routehelper.redirectToRoute('registerPerson', {username: vm.user.username});
            }, function (validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
                logger.warning("Register failed");

            });
        };

        activate();

        function activate() {
            logger.info('Activated Manage User View');
        }
    }
})();