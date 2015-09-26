(function () {
    'use strict';

    angular
        .module('app.resetPassword')
        .controller('ResetPassword', ResetPassword);

    ResetPassword.$inject = ['$routeParams', 'logger', 'dataUpdateService', 'validationService'];

    /* @ngInject */
    function ResetPassword($routeParams, logger, dataUpdateService, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Reset Password';
        vm.isSubmitted = false;
        vm.loginUrl = '#/login';

        vm.submit = function (form) {
            dataUpdateService.resetPassword($routeParams.id, vm.password).then(function () {
                vm.isSubmitted = true;
            }, function (validationErrors) {
                validationService.applyServerSideErrors(form, validationErrors);
                logger.warning('Password Reset failed');
            });
        };

        activate();

        function activate() {
            logger.info('Activated Reset Password View');
        }
    }
})();
