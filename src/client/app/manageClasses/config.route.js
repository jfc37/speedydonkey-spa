(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/classes',
                config: {
                    title: 'manageClasses',
                    controller: 'ManageClasses',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageClasses/manageClasses.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();