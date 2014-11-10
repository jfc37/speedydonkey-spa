(function () {
    'use strict';

    angular
        .module('app.register')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/register',
                config: {
                    title: 'register',
                    controller: 'Register',
                    controllerAs: 'vm',
                    templateUrl: 'app/register/register.html'
                }
            }
        ];
    }
})();