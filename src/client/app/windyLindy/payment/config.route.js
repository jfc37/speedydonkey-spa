(function () {
    'use strict';

    angular
        .module('app.windyLindy')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/windy-lindy/payment/:id',
                config: {
                    title: 'windy-lindy-payment',
                    controller: 'Payment',
                    controllerAs: 'vm',
                    templateUrl: 'app/windyLindy/payment/payment.html',
                    allowAnonymous: true
                }
            },
            {
                url: '/windy-lindy/payment/:id/paypal/confirm',
                config: {
                    title: 'windy-lindy-payment-paypal-confirm',
                    controller: 'PaypalConfirm',
                    controllerAs: 'vm',
                    templateUrl: 'app/windyLindy/payment/paypalConfirm.html',
                    allowAnonymous: true
                }
            },
            {
                url: '/windy-lindy/payment/:id/poli/confirm',
                config: {
                    title: 'windy-lindy-payment-poli-confirm',
                    controller: 'PaypalConfirm',
                    controllerAs: 'vm',
                    templateUrl: 'app/windyLindy/payment/poliConfirm.html',
                    allowAnonymous: true
                }
            }
        ];
    }
})();
