namespace jfc {
    'use strict';

    /* @ngInject */
    class BlockSummary {

        public filter: IStandardReportFilter = {
            to: new Date(),
            from: new Date()
        };

        public report;

        constructor(
            private blockSummaryRepository: IBlockSummaryRepository,
            private blockDetailsModal: IBlockDetailsModal,
            private niceAlert: INiceAlert) { }

        public run() {
            this.blockSummaryRepository.get(this.filter).then((report) => {
                this.report = report;
            }).catch(this.onReportError);
        }

        public downloadCsv() {
            this.blockSummaryRepository.getCsv(this.filter).catch(this.onReportError);
        }

        public openBlockDetails(block) {
            this.blockDetailsModal.open(block);
        };

        public onReportError = (validationMessage: string) => {
            if (validationMessage) {
                this.niceAlert.validationWarning(validationMessage);
            } else {
                this.niceAlert.errorMessage('Something went wrong running the report.');
            }
        }
    }

    angular
        .module('app.reports')
        .controller('BlockSummary', BlockSummary);
}
