/*global $*/
(function () {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ngCookies',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router',
        /*
         * 3rd Party modules
         */
        'ngplus', 'ui.bootstrap.datetimepicker', 'blockUI', 'LocalStorageModule', 'auth0', 'angular-storage', 'angular-jwt'
    ]);

    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a') && ($(e.target).attr('class') !== 'dropdown-toggle')) {
            $(this).collapse('hide');
        }
    });

})();
