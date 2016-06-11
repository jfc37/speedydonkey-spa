var jfc;
(function (jfc) {
    'use strict';
    var TeacherInvoices = (function () {
        function TeacherInvoices(teacherInvoiceRepository, niceAlert) {
            var _this = this;
            this.teacherInvoiceRepository = teacherInvoiceRepository;
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
        TeacherInvoices.prototype.run = function () {
            var _this = this;
            this.teacherInvoiceRepository.get(this.filter).then(function (report) {
                _this.report = report;
            }).catch(this.onReportError);
        };
        ;
        TeacherInvoices.prototype.downloadCsv = function () {
            this.teacherInvoiceRepository.getCsv(this.filter).catch(this.onReportError);
        };
        ;
        return TeacherInvoices;
    }());
    angular
        .module('app.reports')
        .controller('TeacherInvoices', TeacherInvoices);
})(jfc || (jfc = {}));
