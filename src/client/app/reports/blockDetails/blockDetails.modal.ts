namespace jfc {
    'use strict';

    export interface IBlockDetailsModal {
        open(block: IBlockDetailsReportFilter): angular.IPromise<any>;
    }

    interface IBlockDetailsModalViewModel {
        reportFilter?: IBlockDetailsReportFilter;
        report?;
        block?;
        downloadCsv();
    }

    class BlockDetailsModal implements IBlockDetailsModal {

        /*@ngInject*/
        constructor(
            private $uibModal,
            private $q: angular.IQService,
            private blockDetailsRepository: IBlockDetailsRepository,
            private niceAlert: INiceAlert) { }

        private _modalInstance;

        public downloadCsv = () => {
            this.blockDetailsRepository.getCsv(this._viewModel.reportFilter).catch(this.onReportError);
        }

        private onReportError = (validationMessage?: string) => {
            if (validationMessage) {
                this.niceAlert.validationWarning(validationMessage);
            } else {
                this.niceAlert.errorMessage('Something went wrong running the report.');
            }
        }

        private _viewModel: IBlockDetailsModalViewModel = {
            downloadCsv: this.downloadCsv
        };

        public open(block: IBlockDetailsReportFilter): angular.IPromise<any> {

            let deferred = this.$q.defer();

            this._viewModel.reportFilter = block;

            this.blockDetailsRepository.get(this._viewModel.reportFilter).then((report) => {

                this._viewModel.block = block;
                this._viewModel.report = report;

                this._modalInstance = this.$uibModal.open({
                    templateUrl: 'app/reports/blockDetails/blockDetails.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'lg',
                    resolve: {
                        viewModel: () => {
                            return this._viewModel;
                        }
                    }
                });

                this._modalInstance.result.then(() => {
                    deferred.resolve();
                }, () => {
                    deferred.reject();
                });
            }).catch(this.onReportError);

            return deferred.promise;
        }
    }

    angular
        .module('app.reports')
        .service('blockDetailsModal', BlockDetailsModal);
}
