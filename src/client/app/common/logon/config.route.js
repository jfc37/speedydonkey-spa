(function () {
    'use strict';

    angular
        .module('app.common.logon')
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
                    templateUrl: 'app/common/logon/login/login.html'
                }
            },
            {
                url: '/register',
                config: {
                    title: 'register',
                    controller: 'Register',
                    controllerAs: 'vm',
                    templateUrl: 'app/common/logon/register/register.html'
                }
            }
        ];
    }
})();