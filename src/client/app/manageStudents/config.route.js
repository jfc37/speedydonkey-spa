(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
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
                    displayName: 'Students',
                    settings: {
                        nav: 50,
                        level: 2,
                        parent: 'admin dashboard'
                    },
                    claim: 'Teacher'
                }
            }
        ];
    }
})();
