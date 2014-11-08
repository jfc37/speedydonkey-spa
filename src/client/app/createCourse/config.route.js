(function () {
    'use strict';

    angular
        .module('app.createCourse')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/manageCourses/new',
                config: {
                    title: 'createCourse',
                    controller: 'CreateCourse',
                    controllerAs: 'vm',
                    templateUrl: 'app/createCourse/createCourse.html'
                }
            }
        ];
    }
})();