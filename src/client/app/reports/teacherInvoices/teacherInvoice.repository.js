var jfc;
(function (jfc) {
    'use strict';
    var TeacherInvoiceRepository = (function () {
        /* @ngInject */
        function TeacherInvoiceRepository(httpService, validationPromise, fileDownloadService) {
            this.httpService = httpService;
            this.validationPromise = validationPromise;
            this.fileDownloadService = fileDownloadService;
        }
        TeacherInvoiceRepository.prototype.get = function (filter) {
            var _this = this;
            var formatedFilter = this.getFormattedFilter(filter);
            var options = this.getOptions(formatedFilter);
            return this.httpService.get(options).then(function (response) {
                return response.data;
            }).catch(function (response) {
                return _this.validationPromise.rejectWithFirstMessage(response);
            });
        };
        TeacherInvoiceRepository.prototype.getCsv = function (filter) {
            var _this = this;
            var csvFilter = angular.copy(filter);
            csvFilter.type = 'csv';
            return this.get(csvFilter).then(function (data) {
                var fileName = _this.getFileName(csvFilter);
                _this.fileDownloadService.downloadAsCsv(data, fileName);
            });
        };
        TeacherInvoiceRepository.prototype.getFileName = function (filter) {
            var fromDisplay = moment(filter.from).format('DD-MM-YYYY');
            var toDisplay = moment(filter.to).format('DD-MM-YYYY');
            return "teacher_invoices_" + fromDisplay + "_" + toDisplay;
        };
        TeacherInvoiceRepository.prototype.getFormattedFilter = function (filter) {
            if (!filter.from || !filter.to) {
                throw new Error('From and To need to be provided');
            }
            var formattedFilter = angular.copy(filter);
            formattedFilter.from = moment(filter.from);
            formattedFilter.to = moment(filter.to).add(1, 'day');
            return formattedFilter;
        };
        TeacherInvoiceRepository.prototype.getOptions = function (filter) {
            return {
                resource: 'reports/teacher-invoices',
                parameters: filter,
                block: true
            };
        };
        return TeacherInvoiceRepository;
    }());
    angular
        .module('app.reports')
        .service('teacherInvoiceRepository', TeacherInvoiceRepository);
})(jfc || (jfc = {}));
