(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/class/:id/check-in',
                config: {
                    templateUrl: 'app/classCheckIn/classCheckIn.html',
                    controller: 'ClassCheckIn',
                    controllerAs: 'vm',
                    title: 'classCheckIn',
                    claim: 'Teacher'
                }
            }
        ];
    }
})();
