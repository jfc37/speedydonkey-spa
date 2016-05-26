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
                vm.teachers = report.lines;

                if (vm.teachers.length) {
                    vm.teachers.push({
                        name: 'Total',
                        amountOwed: report.totalOwed
                    });
                }

            }).catch(function (validationMessage) {
                if (validationMessage) {
                    niceAlert.validationWarning(validationMessage);
                } else {
                    niceAlert.error('Something went wrong running the report.');
                }
            });
        };
    }
})();
