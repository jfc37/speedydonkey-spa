(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/PassOptions',
                config: {
                    title: 'managePassOptions',
                    controller: 'ManagePassOptions',
                    controllerAs: 'vm',
                    templateUrl: 'app/managePassOptions/managePassOptions.html'
                }
            }
        ];
    }
})();