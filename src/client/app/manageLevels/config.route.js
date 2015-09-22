(function () {
    'use strict';

    angular
        .module('app.manageLevels')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/levels',
                config: {
                    title: 'manageLevels',
                    controller: 'ManageLevels',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageLevels/manageLevels.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();
