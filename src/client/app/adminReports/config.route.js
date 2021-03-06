(function () {
    'use strict';

    angular
        .module('app.adminReports')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/reports',
                config: {
                    templateUrl: 'app/adminReports/adminReports.html',
                    controller: 'AdminReports',
                    controllerAs: 'vm',
                    title: 'admin reports',
                    settings: {
                        nav: 60,
                        displayName: 'Reports',
                        displayIcon: 'fa-area-chart',
                        level: 1
                    },
                    claim: 'Admin'
                }
            }
        ];
    }
})();
