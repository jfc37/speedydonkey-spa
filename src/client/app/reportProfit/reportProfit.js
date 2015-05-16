(function () {
    'use strict';

    angular
        .module('app.reportProfit')
        .controller('ReportProfit', ReportProfit);

    ReportProfit.$inject = ['$q', 'reportProfitService', 'logger', 'validationService'];

    /* @ngInject */
    function ReportProfit($q, reportProfitService, logger, validationService) {
        /*jshint validthis: true */
        var vm = this;
        vm.starting = moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DD');
        vm.ending = moment().endOf('day').add(2, 'month').format('YYYY-MM-DD');

        vm.updateDateRanage = function() {
            reportProfitService.getProfitReport(vm.starting, vm.ending).then(function (profitReport) {
                vm.profitReport = profitReport;
            }, function () {
                logger.error('Issue getting profit report');
            });
        };

        activate();

        function activate() {
            var promises = [vm.updateDateRanage()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Profit Report');
            });
        }
    }
})();