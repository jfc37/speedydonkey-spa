(function () {
    'use strict';

    angular
        .module('app.course')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/courses',
                config: {
                    title: 'courses',
                    controller: 'Course',
                    controllerAs: 'vm',
                    templateUrl: 'app/course/courses.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-calendar"></i> My Courses'
                    }
                }
            }
        ];
    }
})();