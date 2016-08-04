var jfc;
(function (jfc) {
    'use strict';
    angular
        .module('app.teachers')
        .run(appRun);
    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }
    function getRoutes() {
        return [
            {
                url: '/teacher/availability',
                config: {
                    title: 'availability',
                    controller: 'TeacherAvailability',
                    controllerAs: 'vm',
                    templateUrl: 'app/teachers/availability/availability.html',
                    displayName: 'Availability',
                    claim: 'Teacher',
                    settings: {
                        nav: 35,
                        displayName: 'My Availability',
                        displayIcon: 'fa-calendar',
                        level: 1
                    }
                }
            }
        ];
    }
})(jfc || (jfc = {}));
;
