(function () {
    'use strict';

    angular
        .module('app.register')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
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
                    templateUrl: 'app/register/registerUser.html',
                    allowAnonymous: true,
                    denyAuthorised: true
                }
            }
        ];
    }
})();
