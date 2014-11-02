(function () {
    'use strict';

    angular
        .module('app.myCourse')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/myCourses/:courseName',
                config: {
                    title: 'myCourse',
                    controller: 'MyCourse',
                    controllerAs: 'vm',
                    templateUrl: 'app/myCourse/myCourse.html'
                }
            }
        ];
    }
})();