(function () {
    'use strict';

    angular
        .module('app.forgottenPassword')
        .controller('ForgottenPassword', ForgottenPassword);

    /* @ngInject */
    function ForgottenPassword(logger, dataUpdateService, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Forgotten Password';
        vm.isSubmitted = false;

        vm.submit = function (form) {
            dataUpdateService.forgottenPassword(vm.email).then(function () {
                vm.isSubmitted = true;
            });
        };

        activate();

        function activate() {
            logger.info('Activated Forgotten Password View');
        }
    }
})();
