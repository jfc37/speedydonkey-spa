(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/teachers',
                config: {
                    title: 'manageTeachers',
                    controller: 'ManageTeachers',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageTeachers/manageTeachers.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();