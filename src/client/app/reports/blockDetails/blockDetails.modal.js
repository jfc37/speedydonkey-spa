var jfc;
(function (jfc) {
    'use strict';
    var BlockDetailsModal = (function () {
        /*@ngInject*/
        function BlockDetailsModal($uibModal, $q, blockDetailsRepository, niceAlert) {
            var _this = this;
            this.$uibModal = $uibModal;
            this.$q = $q;
            this.blockDetailsRepository = blockDetailsRepository;
            this.niceAlert = niceAlert;
            this.downloadCsv = function () {
                _this.blockDetailsRepository.getCsv(_this._viewModel.reportFilter).catch(_this.onReportError);
            };
            this.onReportError = function (validationMessage) {
                if (validationMessage) {
                    _this.niceAlert.validationWarning(validationMessage);
                }
                else {
                    _this.niceAlert.errorMessage('Something went wrong running the report.');
                }
            };
            this._viewModel = {
                downloadCsv: this.downloadCsv
            };
        }
        BlockDetailsModal.prototype.open = function (block) {
            var _this = this;
            var deferred = this.$q.defer();
            this._viewModel.reportFilter = block;
            this.blockDetailsRepository.get(this._viewModel.reportFilter).then(function (report) {
                _this._viewModel.block = block;
                _this._viewModel.report = report;
                _this._modalInstance = _this.$uibModal.open({
                    templateUrl: 'app/reports/blockDetails/blockDetails.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'lg',
                    resolve: {
                        viewModel: function () {
                            return _this._viewModel;
                        }
                    }
                });
                _this._modalInstance.result.then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            }).catch(this.onReportError);
            return deferred.promise;
        };
        return BlockDetailsModal;
    }());
    angular
        .module('app.reports')
        .service('blockDetailsModal', BlockDetailsModal);
})(jfc || (jfc = {}));
