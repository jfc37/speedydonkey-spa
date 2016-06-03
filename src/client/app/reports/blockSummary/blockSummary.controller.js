(function () {
    'use strict';

    angular
        .module('app.reports')
        .controller('BlockSummary', BlockSummary);

    /* @ngInject */
    function BlockSummary(blockSummaryRepository, blockDetailsModal, niceAlert) {
        var vm = this;

        vm.filter = {
            to: new Date(),
            from: new Date()
        };
        vm.blocks = [];

        vm.run = function () {
            blockSummaryRepository.get(vm.filter).then(function (report) {
                vm.blocks = report.lines;

                if (vm.blocks.length) {
                    vm.blocks.push({
                        name: 'Total',
                        attendance: report.totalAttendance,
                        revenue: report.totalRevenue
                    });
                }
            }).catch(onReportError);
        };

        vm.downloadCsv = function () {
            blockSummaryRepository.getCsv(vm.filter).catch(onReportError);
        };

        vm.openBlockDetails = function(block) {
            blockDetailsModal.open(block);
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
