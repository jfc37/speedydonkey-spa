(function () {
    'use strict';

    angular
        .module('app.reports')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/reports/teacher-invoices',
                config: {
                    title: 'teacherInvoices',
                    controller: 'TeacherInvoices',
                    controllerAs: 'vm',
                    templateUrl: 'app/reports/teacherInvoices/teacherInvoices.html',
                    displayName: 'Teacher Invoices',
                    settings: {
                        nav: 20,
                        level: 2,
                        parent: 'admin reports'
                    },
                    claim: 'Admin'
                }
            },
            {
                url: '/admin/reports/pass-sales',
                config: {
                    title: 'passSales',
                    controller: 'PassSales',
                    controllerAs: 'vm',
                    templateUrl: 'app/reports/passSales/passSales.html',
                    displayName: 'Pass Sales',
                    settings: {
                        nav: 30,
                        level: 2,
                        parent: 'admin reports'
                    },
                    claim: 'Admin'
                }
            }
        ];
    }
})();
