(function () {
    'use strict';

    angular
        .module('app.reportProfit')
        .factory('reportProfitService', reportProfitService);

    reportProfitService.$inject = ['$q', 'dataservice'];

    /* @ngInject */
    function reportProfitService($q, dataservice){

        var service = {
            getProfitReport: getProfitReport
        };

        function getProfitReport(starting, ending) {
            return $q(function (resolve, revoke) {
                dataservice.getProfitReport(starting, ending).then(function (profitReport) {
                    resolve(profitReport);
                }, revoke);
            });
        }

        return service;

    }
})();