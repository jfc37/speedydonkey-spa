/*global Raygun*/
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
        appErrorPrefix: '[<company> Error] ', //Configure the exceptionHandler decorator
        appTitle: '<company>',
        apiUrl: '<apiUrl>',
        spaUrl: '<spaUrl>',
        paypal: {
            returnUrl: '#/purchasePass/confirm',
            cancelUrl: '#/purchasePass',
            paymentUrl: 'https://www.<paypalDomain>/cgi-bin/webscr?cmd=_express-checkout&token=',

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
        routehelperConfigProvider.config.docTitle = '<company>: ';

        // Configure the common exception handler
        exceptionConfigProvider.config.appErrorPrefix = config.appErrorPrefix;

        Raygun.init('<raygunKey>').attach();
    }

})();
