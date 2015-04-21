(function () {
    'use strict';

    angular
        .module('app.manageUser')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/manageUser',
                config: {
                    title: 'manageUser',
                    controller: 'ManageUser',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageUser/manageUser.html'
                }
            }
        ];
    }
})();