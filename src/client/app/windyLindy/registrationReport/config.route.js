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
                url: '/admin/reports/windy-lindy/registrations',
                config: {
                    title: 'Windy Lindy Registrations',
                    controller: 'Report',
                    controllerAs: 'vm',
                    templateUrl: 'app/windyLindy/registrationReport/report.html',
                    displayName: 'Windy Lindy Registrations',
                    settings: {
                        nav: 30,
                        level: 2,
                        parent: 'admin reports'
                    },
                    claim: 'Admin'
                }
            }
        ];
    }
})();
