(function () {
    'use strict';

    angular
        .module('app.courseEnrolment')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/enrolment',
                config: {
                    title: 'courseEnrolment',
                    controller: 'CourseEnrolment',
                    controllerAs: 'vm',
                    templateUrl: 'app/courseEnrolment/courseEnrolment.html',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-toggle-on"></i> Manage Enrolments'
                    }
                }
            }
        ];
    }
})();