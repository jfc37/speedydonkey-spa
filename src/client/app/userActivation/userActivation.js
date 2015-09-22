(function () {
    'use strict';

    angular
        .module('app.userActivation')
        .controller('UserActivation', UserActivation);

    /* @ngInject */
    function UserActivation(userActivationService, logger, routehelper, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'User Activation';
        vm.loginUrl = '#/login';
        vm.loaded = false;

        activate();

        function activate() {
            logger.info('Activated User Activation View');
            userActivationService.activate().then(function () {
                vm.activationSuccessful = true;
                vm.loaded = true;
            }, function (validation_errors) {
                logger.warning('Activation Failed');
                vm.activationSuccessful = false;
                vm.loaded = true;
            });
        }
    }
})();
