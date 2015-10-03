(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/blockEnrolment',
                config: {
                    title: 'blockEnrolment',
                    controller: 'BlockEnrolment',
                    controllerAs: 'vm',
                    templateUrl: 'app/blockEnrolment/blockEnrolment.html',
                    settings: {
                        nav: 2,
                        displayName: 'Block Enrolment',
                        displayIcon: 'fa-toggle-on'
                    }
                }
            }
        ];
    }
})();
