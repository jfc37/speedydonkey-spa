(function () {
    'use strict';

    angular
        .module('app.reportProfit')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
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
                    claim: 'Admin'
                }
            }
        ];
    }
})();