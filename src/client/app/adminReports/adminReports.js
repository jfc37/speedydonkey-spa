(function () {
    'use strict';

    angular
        .module('app.adminReports')
        .controller('AdminReports', AdminReports);

    AdminReports.$inject = [];

    /* @ngInject */
    function AdminReports() {
        /*jshint validthis: true */
        var vm = this;
        vm.teacherClassHoursUrl = '#/admin/reports/teacher_hours';
    }
})();
