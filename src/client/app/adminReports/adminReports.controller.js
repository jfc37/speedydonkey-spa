(function () {
    'use strict';

    angular
        .module('app.adminReports')
        .controller('AdminReports', AdminReports);

    /* @ngInject */
    function AdminReports() {
        /*jshint validthis: true */
        var vm = this;
        vm.teacherClassHoursUrl = '#/admin/reports/teacher_hours';
        vm.profitReportUrl = '#/admin/reports/profit';
        vm.windyLindyUrl = '#/admin/reports/windy-lindy/registrations';
    }
})();
