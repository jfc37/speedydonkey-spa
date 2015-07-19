(function () {
    'use strict';

    angular
        .module('app.windyLindy.payment')
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
            }
        ];
    }
})();
