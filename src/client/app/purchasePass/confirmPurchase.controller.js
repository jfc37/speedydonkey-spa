(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .controller('ConfirmPurchase', ConfirmPurchase);

    ConfirmPurchase.$inject = ['$routeParams', 'paypalExpressCheckout', 'routehelper', 'blockUI', 'config'];

    /* @ngInject */
    function ConfirmPurchase($routeParams, paypalExpressCheckout, routehelper, blockUI, config) {
        /*jshint validthis: true */
        var vm = this;

        activate();

        function activate() {
            blockUI.start();
            paypalExpressCheckout.confirm($routeParams.token).then(function (pendingPurchase) {
                vm.pendingPurchase = pendingPurchase;
                blockUI.stop();
            });
        }

        vm.complete = function () {
            blockUI.start();
            paypalExpressCheckout.complete($routeParams.token).then(function () {
                blockUI.stop();
                routehelper.redirectToRoute('dashboard');
            });
        };
    }
})();
