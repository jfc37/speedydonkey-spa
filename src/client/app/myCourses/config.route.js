(function () {
    'use strict';

    angular
        .module('app.myCourses')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/myCourses',
                config: {
                    title: 'myCourses',
                    controller: 'MyCourses',
                    controllerAs: 'vm',
                    templateUrl: 'app/myCourses/myCourses.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-calendar"></i> My Courses'
                    }
                }
            }
        ];
    }
})();