/*global ga*/
(function () {
    'use strict';

    var core = angular.module('app.core');
    core.config(toastrConfig);
    core.config(blockUiConfig);
    core.config(localStorageConfig);

    var loginModule = angular.module('app.logon');
    loginModule.config(authZeroConfig);

    var apiCallerModule = angular.module('app.apiCaller');
    apiCallerModule.config(jwtInterceptorConfig);

    /* @ngInject */
    function jwtInterceptorConfig($httpProvider, jwtInterceptorProvider) {
        var refreshingToken = null;

        /* @ngInject */
        function tokenGetter(store, jwtHelper, auth) {
            var token = store.get('token');
            var refreshToken = store.get('refreshToken');

            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    return store.get('token');
                } else {
                    if (refreshingToken === null) {
                        refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
                            store.set('token', idToken);
                            return idToken;
                        }).finally(function () {
                            refreshingToken = null;
                        });
                    }
                }
            }
        }

        jwtInterceptorProvider.tokenGetter = tokenGetter;

        $httpProvider.interceptors.push('jwtInterceptor');
    }

    /* @ngInject */
    function authZeroConfig(authProvider) {
        authProvider.init({
            domain: 'jfc-dev.au.auth0.com',
            clientID: 'jaLVtw90tXt8tCCBIHIUJLIcP2p2MMdE',
            loginUrl: '/login',
        });
    }

    setupGoogleAnalytics();

    function setupGoogleAnalytics() {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments);
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-36895453-2', 'auto');

    }

    /* @ngInject */
    function localStorageConfig(localStorageServiceProvider) {
        localStorageServiceProvider
            .setStorageCookieDomain('localhost:3000')
            .setPrefix('fullswing');
    }

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    /* @ngInject */
    function blockUiConfig(blockUIConfig) {
        blockUIConfig.delay = 0;
        blockUIConfig.resetOnException = true;
        blockUIConfig.autoBlock = false;
        blockUIConfig.templateUrl = 'app/core/directives/blockUiOverlay.html';
    }

    var config = {
        appErrorPrefix: '[Speedy Donkey LOCAL Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Speedy Donkey LOCAL',
        apiUrl: 'api-speedydonkey.azurewebsites.net',
        spaUrl: 'localhost:3000',
        paypal: {
            returnUrl: '#/purchasePass/confirm',
            cancelUrl: '#/purchasePass',
            paymentUrl: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=',

        },
        version: '3.0.0'
    };

    core.value('config', config);

    core.config(configure);

    /* @ngInject */
    function configure($logProvider, $routeProvider, routehelperConfigProvider, exceptionConfigProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'Speedy Donkey LOCAL: ';

        // Configure the common exception handler
        exceptionConfigProvider.config.appErrorPrefix = config.appErrorPrefix;
    }

})();
