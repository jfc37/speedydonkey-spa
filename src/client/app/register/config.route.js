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
                url: '/register/account',
                config: {
                    title: 'registerAccount',
                    controller: 'RegisterAccount',
                    controllerAs: 'vm',
                    templateUrl: 'app/register/registerAccount.html',
                    allowAnonymous: true,
                    denyAuthorised: true
                }
            },
            {
                url: '/register/person',
                config: {
                    title: 'registerPerson',
                    controller: 'RegisterPerson',
                    controllerAs: 'vm',
                    templateUrl: 'app/register/registerPerson.html',
                    denyRegisteredPerson: true,
                    allowUnregisteredPerson: true
                }
            },
        ];
    }
})();