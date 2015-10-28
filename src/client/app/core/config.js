/*global rg4js*/
(function () {
    'use strict';

    var core = angular.module('app.core');
    core.config(toastrConfig);
    core.config(blockUiConfig);

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
            '//cdn.raygun.io/raygun4js/raygun.min.js', 'rg4js');

        rg4js('apiKey', 'QjEhJ+hmGUEuvW7qQpYKGQ==');
        rg4js('attach', true);
        rg4js('enableCrashReporting', true);
        rg4js('enablePulse', true);

    }

})();
