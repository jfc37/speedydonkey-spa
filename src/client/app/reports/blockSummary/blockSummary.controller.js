var jfc;
(function (jfc) {
    'use strict';
    /* @ngInject */
    var BlockSummary = (function () {
        function BlockSummary(blockSummaryRepository, blockDetailsModal, niceAlert) {
            var _this = this;
            this.blockSummaryRepository = blockSummaryRepository;
            this.blockDetailsModal = blockDetailsModal;
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
        BlockSummary.prototype.run = function () {
            var _this = this;
            this.blockSummaryRepository.get(this.filter).then(function (report) {
                _this.report = report;
            }).catch(this.onReportError);
        };
        BlockSummary.prototype.downloadCsv = function () {
            this.blockSummaryRepository.getCsv(this.filter).catch(this.onReportError);
        };
        BlockSummary.prototype.openBlockDetails = function (block) {
            this.blockDetailsModal.open(block);
        };
        ;
        return BlockSummary;
    }());
    angular
        .module('app.reports')
        .controller('BlockSummary', BlockSummary);
})(jfc || (jfc = {}));
