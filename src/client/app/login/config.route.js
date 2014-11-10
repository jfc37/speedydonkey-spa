(function () {
    'use strict';

    angular
        .module('app.logon')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/login',
                config: {
                    title: 'login',
                    controller: 'Login',
                    controllerAs: 'vm',
                    templateUrl: 'app/login/login.html'
                }
            }
        ];
    }
})();