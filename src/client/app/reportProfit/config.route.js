(function () {
    'use strict';

    angular
        .module('app.reportProfit')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/reports/profit',
                config: {
                    title: 'reportProfit',
                    controller: 'ReportProfit',
                    controllerAs: 'vm',
                    templateUrl: 'app/reportProfit/reportProfit.html',
                    displayName: 'Profit / Loss',
                    settings: {
                        nav: 10,
                        level: 2,
                        parent: 'admin reports'
                    },
                    claim: 'Admin'
                }
            }
        ];
    }
})();
