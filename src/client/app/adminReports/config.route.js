(function () {
    'use strict';

    angular
        .module('app.adminReports')
        .run(appRun);

    appRun.$inject = ['routehelper'];

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
                        nav: 3,
                        content: '<i class="fa fa-area-chart"></i> Admin Reports'
                    },claim: 'Admin'
                }
            }
        ];
    }
})();
