(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/purchase-pass',
                config: {
                    title: 'purchasePass',
                    controller: 'PurchasePass',
                    controllerAs: 'vm',
                    templateUrl: 'app/purchasePass/purchasePass.html',
                    settings: {
                        nav: 6,
                        content: '<i class="fa fa-credit-card"></i> Purchase Pass'
                    }
                }
            },
            {
                url: '/purchase-pass/:id/payment',
                config: {
                    title: 'passPayment',
                    controller: 'PassPayment',
                    controllerAs: 'vm',
                    templateUrl: 'app/purchasePass/payment.html'
                }
            },
            {
                url: '/purchase-pass/payment/:registrationNumber/paypal/confirm',
                config: {
                    title: 'passPaymentPaypalConfirm',
                    controller: 'PassPaymentPaypalConfirm',
                    controllerAs: 'vm',
                    templateUrl: 'app/purchasePass/paypalConfirm.html'
                }
            },
            {
                url: '/purchase-pass/payment/:registrationNumber/complete',
                config: {
                    title: 'passPurchaseComplete',
                    controller: 'PassPurchaseComplete',
                    controllerAs: 'vm',
                    templateUrl: 'app/purchasePass/complete.html'
                }
            }
        ];
    }
})();
