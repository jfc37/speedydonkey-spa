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
                url: '/windy-lindy/registration',
                config: {
                    title: 'Windy Lindy Registration',
                    controller: 'Registration',
                    controllerAs: 'vm',
                    templateUrl: 'app/windyLindy/registration/registration.html',
                    allowAnonymous: true
                }
            }
        ];
    }
})();
