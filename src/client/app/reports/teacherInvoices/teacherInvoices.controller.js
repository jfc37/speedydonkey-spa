(function () {
    'use strict';

    angular
        .module('app.reports')
        .controller('TeacherInvoices', TeacherInvoices);

    /* @ngInject */
    function TeacherInvoices(teacherInvoiceRepository, niceAlert) {
        var vm = this;

        vm.filter = {
            to: new Date(),
            from: new Date()
        };
        vm.teachers = [];

        vm.run = function () {
            teacherInvoiceRepository.get(vm.filter).then(function (report) {
                vm.report = report;
            }).catch(onReportError);
        };

        vm.downloadCsv = function () {
            teacherInvoiceRepository.getCsv(vm.filter).catch(onReportError);
        };

        function onReportError(validationMessage) {
            if (validationMessage) {
                niceAlert.validationWarning(validationMessage);
            } else {
                niceAlert.error('Something went wrong running the report.');
            }
        }
    }
})();
