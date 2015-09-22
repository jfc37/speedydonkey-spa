(function () {
    'use strict';

    angular
        .module('app.adminDashboard')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/dashboard',
                config: {
                    templateUrl: 'app/adminDashboard/adminDashboard.html',
                    controller: 'AdminDashboard',
                    controllerAs: 'vm',
                    title: 'admin dashboard',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-cogs"></i> Admin Dashboard'
                    },
                    claim: 'Teacher'
                }
            }
        ];
    }
})();
