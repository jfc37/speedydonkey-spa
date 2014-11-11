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
                url: '/register/user',
                config: {
                    title: 'registerUser',
                    controller: 'RegisterUser',
                    controllerAs: 'vm',
                    templateUrl: 'app/register/registerUser.html'
                }
            },
            {
                url: '/register/:username/person',
                config: {
                    title: 'registerPerson',
                    controller: 'RegisterPerson',
                    controllerAs: 'vm',
                    templateUrl: 'app/register/registerPerson.html'
                }
            },
        ];
    }
})();