var jfc;
(function (jfc) {
    'use strict';
    var PassSales = (function () {
        /* @ngInject */
        function PassSales(passSalesRepository, niceAlert) {
            var _this = this;
            this.passSalesRepository = passSalesRepository;
            this.niceAlert = niceAlert;
            this.filter = {
                to: new Date(),
                from: new Date()
            };
            this.onReportError = function (validationMessage) {
                if (validationMessage) {
                    _this.niceAlert.validationWarning(validationMessage);
                }
                else {
                    _this.niceAlert.errorMessage('Something went wrong running the report.');
                }
            };
        }
        PassSales.prototype.run = function () {
            var _this = this;
            this.passSalesRepository.get(this.filter).then(function (report) {
                _this.report = report;
            }).catch(this.onReportError);
        };
        ;
        PassSales.prototype.downloadCsv = function () {
            this.passSalesRepository.getCsv(this.filter).catch(this.onReportError);
        };
        ;
        return PassSales;
    }());
    angular
        .module('app.reports')
        .controller('PassSales', PassSales);
})(jfc || (jfc = {}));
