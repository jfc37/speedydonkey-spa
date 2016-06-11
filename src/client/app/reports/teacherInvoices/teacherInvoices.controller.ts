namespace jfc {
    'use strict';

    class TeacherInvoices {

        public filter: IStandardReportFilter = {
            to: new Date(),
            from: new Date()
        };

        public report;

        constructor(
            private teacherInvoiceRepository: ITeacherInvoiceRepository,
            private niceAlert: INiceAlert) { }

        public run() {
            this.teacherInvoiceRepository.get(this.filter).then((report) => {
                this.report = report;
            }).catch(this.onReportError);
        };

        public downloadCsv() {
            this.teacherInvoiceRepository.getCsv(this.filter).catch(this.onReportError);
        };

        private onReportError = (validationMessage?: string) => {
            if (validationMessage) {
                this.niceAlert.validationWarning(validationMessage);
            } else {
                this.niceAlert.errorMessage('Something went wrong running the report.');
            }
        }

    }

    angular
        .module('app.reports')
        .controller('TeacherInvoices', TeacherInvoices);
}
