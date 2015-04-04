(function () {
    'use strict';

    angular
        .module('app.userActivation')
        .controller('UserActivation', UserActivation);

    UserActivation.$inject = ['userActivationService', 'logger', 'routehelper', 'validationService'];

    /* @ngInject */
    function UserActivation(userActivationService, logger, routehelper, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'User Activation';
        vm.activationMessage = 'Activating User...';


        activate();

        function activate() {
            logger.info('Activated User Activation View');

            userActivationService.activate().then(function () {
                vm.activationMessage = 'Your account has been activated';
                routehelper.redirectToRoute('login');
            }, function (validation_errors) {
                logger.warning("Activation Failed");
                vm.activationMessage = 'Issue activating your account';
            });
        }
    }
})();