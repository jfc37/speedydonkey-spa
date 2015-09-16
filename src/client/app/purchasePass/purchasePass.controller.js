(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .controller('PurchasePass', PurchasePass);

    PurchasePass.$inject = ['purchasePassService', 'logger', 'routehelper'];

    /* @ngInject */
    function PurchasePass(purchasePassService, logger, routehelper) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Purchase Pass';
        vm.passOptions = [];

        vm.selectPass = function (pass) {
            routehelper.redirectToRoute('passPayment', {
                id: pass.id
            });
        };

        activate();

        function activate() {
            getPassOptions();
        }

        function getPassOptions() {
            return purchasePassService.getPassOptions().then(function (passOptions) {
                vm.passOptions = passOptions;
            }, function (error) {
                if (!error.displayMessage) {
                    error.arePassesLoading = 'Issue getting pass options...';
                }
                logger.error(error.displayMessage);
            });
        }
    }
})();
