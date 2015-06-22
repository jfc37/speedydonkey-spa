(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .controller('PurchasePass', PurchasePass);

    PurchasePass.$inject = ['purchasePassService', '$q', 'logger', 'routehelper', 'blockUI', 'config'];

    /* @ngInject */
    function PurchasePass(purchasePassService, $q, logger, routehelper, blockUI, config) {
        /*jshint validthis: true */
        var vm = this;
        vm.steps = ['pass selection', 'payment option'];
        vm.step = vm.steps[0];

        vm.title = 'Purchase Pass';
        vm.passOptions = [];
        vm.selectedPass = '';

        vm.paypalConfig = config.paypal;

        vm.shouldFadePass = function (pass) {
            return vm.selectedPass && vm.selectedPass !== pass;
        };

        vm.beginPurchase = function (pass) {
            vm.selectedPass = pass;
            blockUI.start();
            purchasePassService.beginPurchase(vm.selectedPass).then(function (prepurchasedPass) {
                blockUI.stop();
                vm.step = vm.steps[1];
                vm.prepurchasedPassId = prepurchasedPass.id;
                logger.success('Prepurchased pass');
            }, function () {
                blockUI.stop();
                logger.error('Problem prepurchasing pass');
            });
        };

        activate();

        function activate() {
            var promises = [getPassOptions()];
            blockUI.start();
            return $q.all(promises)
                .then(function () {
                    blockUI.stop();
                    logger.info('Activated Block Enrolment View');
                });
        }

        function getPassOptions() {
            return purchasePassService.getPassOptions().then(function (passOptions) {
                vm.passOptions = passOptions;
                vm.arePassesLoading = false;
            }, function (error) {
                if (!error.displayMessage) {
                    error.arePassesLoading = 'Issue getting pass options...';
                }
                logger.error(error.displayMessage);
                vm.arePassesLoading = false;
            });
        }
    }
})();
