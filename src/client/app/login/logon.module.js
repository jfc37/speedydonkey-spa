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
        var refreshingToken = null;

        $rootScope.$on('$locationChangeStart', function () {
            var token = store.get('token');
            var refreshToken = store.get('refreshToken');

            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                } else {
                    if (refreshToken) {
                        if (refreshingToken === null) {
                            refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
                                store.set('token', idToken);
                                auth.authenticate(store.get('profile'), idToken);
                            }).finally(function () {
                                refreshingToken = null;
                            });
                        }
                        return refreshingToken;
                    } else {
                        routehelper.redirectToRoute('dashboard');
                    }
                }
            }
        });

        auth.hookEvents();
    }
})();
