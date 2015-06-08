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
                url: '/purchasePass',
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
            }
        ];
    }
})();
