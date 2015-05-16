(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/students',
                config: {
                    title: 'manageStudents',
                    controller: 'ManageStudents',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageStudents/manageStudents.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();