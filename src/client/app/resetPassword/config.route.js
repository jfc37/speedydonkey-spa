(function () {
    'use strict';

    angular
        .module('app.resetPassword')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/account/:id/password/reset',
                config: {
                    title: 'resetPassword',
                    controller: 'ResetPassword',
                    controllerAs: 'vm',
                    templateUrl: 'app/resetPassword/resetPassword.html',
                    allowAnonymous: true,
                    denyAuthorised: true
                }
            }
        ];
    }
})();
