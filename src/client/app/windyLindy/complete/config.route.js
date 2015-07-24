(function () {
    'use strict';

    angular
        .module('app.windyLindy')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/windy-lindy/payment/:id/complete',
                config: {
                    title: 'windy-lindy-complete',
                    controller: 'Complete',
                    controllerAs: 'vm',
                    templateUrl: 'app/windyLindy/complete/complete.html',
                    allowAnonymous: true
                }
            }
        ];
    }
})();
