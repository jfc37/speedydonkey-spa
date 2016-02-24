(function () {
    'use strict';

    angular.module('app', [
        /*
         * Order is not important. Angular makes a
         * pass to register all of the modules listed
         * and then when app.dashboard tries to use app.data,
         * it's components are available.
         */

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */
        'tableSort',
        'summernote',
        'ngSanitize',
        'ui.select',
        'angulartics',
        'angulartics.google.analytics',

        'app.core',
        'app.widgets',
        'app.apiCaller',
        'app.paypalExpressCheckout',
        'app.poliPayment',

        /*
         * Feature areas
         */
        'app.dashboard',
        'app.blockEnrolment',
        'app.layout',
        'app.logon',
        'app.register',
        'app.classCheckIn',
        'app.userActivation',
        'app.forgottenPassword',
        'app.resetPassword',
        'app.manageUser',
        'app.adminDashboard',
        'app.managePassOptions',
        'app.manageAnnouncements',
        'app.manageBlocks',
        'app.rooms',
        'app.users',
        'app.settings',

        'app.standAloneEvents',
        'app.manageClasses',
        'app.manageTeachers',
        'app.manageStudents',
        'app.adminReports',
        'app.reportTeacherHours',
        'app.reportProfit',
        'app.purchasePass',
        'app.windyLindy'
    ]);

})();
