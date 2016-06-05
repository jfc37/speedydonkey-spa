(function () {
    'use strict';

    angular
        .module('app.reports')
        .controller('PassSales', PassSales);

    /* @ngInject */
    function PassSales(passSalesRepository, niceAlert) {
        var vm = this;

        vm.filter = {
            to: new Date(),
            from: new Date()
        };

        vm.run = function () {
            passSalesRepository.get(vm.filter).then(function (report) {
                vm.report = report;
            }).catch(onReportError);
        };

        vm.downloadCsv = function () {
            passSalesRepository.getCsv(vm.filter).catch(onReportError);
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
