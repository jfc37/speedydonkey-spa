(function () {
    'use strict';

    angular.module('app.logon', ['auth0', 'angular-storage', 'angular-jwt']);

})();

(function () {
    'use strict';

    angular
        .module('app.logon')
        .run(run);

    /* @ngInject */
    function run($rootScope, auth, store, jwtHelper, routehelper) {
        $rootScope.$on('$locationChangeStart', function () {
            if (!auth.isAuthenticated) {
                var token = store.get('token');
                if (token) {
                    if (!jwtHelper.isTokenExpired(token)) {
                        auth.authenticate(store.get('profile'), token);
                    } else {
                        routehelper.redirectToRoute('dashboard');
                    }
                }
            }
        });

        auth.hookEvents();
    }
})();
