(function () {
    'use strict';

    angular
        .module('app.userActivation')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/account/:key/activate',
                config: {
                    title: 'userActivation',
                    controller: 'UserActivation',
                    controllerAs: 'vm',
                    templateUrl: 'app/userActivation/userActivation.html',
                    allowAnonymous: true,
                    denyAuthorised: true
                }
            }
        ];
    }
})();
