(function () {
    'use strict';

    angular
        .module('app.reportTeacherHours')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/reports/teacher_hours',
                config: {
                    title: 'reportTeacherHours',
                    controller: 'ReportTeacherHours',
                    controllerAs: 'vm',
                    templateUrl: 'app/reportTeacherHours/reportTeacherHours.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();