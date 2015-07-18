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

        vm.title = 'Purchase Pass';
        vm.passOptions = [];

        vm.beginPurchase = function (pass) {
            vm.selectedPass = pass;
            blockUI.start();
            purchasePassService.beginPurchase(vm.selectedPass);
        };

        activate();

        function activate() {
            var promises = [getPassOptions()];
            blockUI.start();
            return $q.all(promises)
                .then(function () {
                    blockUI.stop();
                    logger.info('Activated Pass Purchase');
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
