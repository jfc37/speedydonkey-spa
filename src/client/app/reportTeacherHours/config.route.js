(function () {
    'use strict';

    angular
        .module('app.reportTeacherHours')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/reports/teacher-hours',
                config: {
                    title: 'reportTeacherHours',
                    controller: 'ReportTeacherHours',
                    controllerAs: 'vm',
                    templateUrl: 'app/reportTeacherHours/reportTeacherHours.html',
                    displayName: 'Teacher Hours',
                    settings: {
                        nav: 20,
                        level: 2,
                        parent: 'admin reports'
                    },
                    claim: 'Admin'
                }
            }
        ];
    }
})();
