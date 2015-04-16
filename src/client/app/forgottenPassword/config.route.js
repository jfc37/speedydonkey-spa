(function () {
    'use strict';

    angular
        .module('app.forgottenPassword')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/forgottenPassword',
                config: {
                    title: 'forgottenPassword',
                    controller: 'ForgottenPassword',
                    controllerAs: 'vm',
                    templateUrl: 'app/forgottenPassword/forgottenPassword.html',
                    allowAnonymous: true,
                    denyAuthorised: true
                }
            }
        ];
    }
})();