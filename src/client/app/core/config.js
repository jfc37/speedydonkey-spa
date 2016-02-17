/*global rg4js ga*/
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
            domain: 'jfc.au.auth0.com',
            clientID: 'tebOmgg6VvwhJCoX6tPcmG1VOt5NoHlJ',
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
        //blockUIConfig.autoInjectBodyBlock = false;
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

        ! function (e, n, t, r, o, s, c, a) {
            e.RaygunObject = o, e[o] = e[o] || function () {
                    (e[o].o = e[o].o || []).push(arguments);
                }, s = n.createElement(t), c = n.getElementsByTagName(t)[0], s.async = 1,
                s.src = r, c.parentNode.insertBefore(s, c), a = e.onerror, e.onerror = function (n, t, r, s, c) {
                    a && a(n, t, r, s, c), e[o].q = e[o].q || [], e[o].q.push({
                        e: c
                    });
                };
        }(window, document, 'script',
            'https://cdn.raygun.io/raygun4js/raygun.min.js', 'rg4js');

        rg4js('apiKey', 'QjEhJ+hmGUEuvW7qQpYKGQ==');
        rg4js('attach', true);
        rg4js('enableCrashReporting', true);
        rg4js('enablePulse', false);

    }

})();
