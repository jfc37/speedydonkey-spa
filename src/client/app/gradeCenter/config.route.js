(function () {
    'use strict';

    angular
        .module('app.gradeCenter')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/myCourses/:courseName/gradeCenter',
                config: {
                    title: 'gradeCenter',
                    controller: 'GradeCenter',
                    controllerAs: 'vm',
                    templateUrl: 'app/gradeCenter/gradeCenter.html'
                }
            }
        ];
    }
})();