(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/manageCourses/edit/:courseName',
                config: {
                    title: 'manageCourse',
                    controller: 'ManageCourse',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageCourse/manageCourse.html',
                    denyStudent: true
                }
            }
        ];
    }
})();