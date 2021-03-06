(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/block-enrolment',
                config: {
                    title: 'blockEnrolment',
                    controller: 'BlockEnrolment',
                    controllerAs: 'vm',
                    templateUrl: 'app/blockEnrolment/blockEnrolment.html',
                    settings: {
                        nav: 20,
                        displayName: 'Block Enrolment',
                        displayIcon: 'fa-toggle-on',
                        level: 1
                    }
                }
            }
        ];
    }
})();
