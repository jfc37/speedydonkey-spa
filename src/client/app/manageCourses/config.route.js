(function () {
    'use strict';

    angular
        .module('app.manageCourses')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/manageCourses',
                config: {
                    title: 'manageCourses',
                    controller: 'ManageCourses',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageCourses/manageCourses.html',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-university"></i> Manage Courses'
                    }
                }
            }
        ];
    }
})();