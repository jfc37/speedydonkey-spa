namespace jfc {
    'use strict';

    class PassSales {

        public filter: IStandardReportFilter = {
            to: new Date(),
            from: new Date()
        };

        public report;

        /* @ngInject */
        constructor(
            private passSalesRepository: IPassSalesRepository,
            private niceAlert: INiceAlert) { }


        public run(): void {
            this.passSalesRepository.get(this.filter).then((report) => {
                this.report = report;
            }).catch(this.onReportError);
        };

        public downloadCsv(): void {
            this.passSalesRepository.getCsv(this.filter).catch(this.onReportError);
        };

        private onReportError = (validationMessage: string) => {
            if (validationMessage) {
                this.niceAlert.validationWarning(validationMessage);
            } else {
                this.niceAlert.errorMessage('Something went wrong running the report.');
            }
        }
    }

    angular
        .module('app.reports')
        .controller('PassSales', PassSales);
}
