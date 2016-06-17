var jfc;
(function (jfc) {
    'use strict';
    var PassSalesRepository = (function () {
        /* @ngInject */
        function PassSalesRepository(httpService, validationPromise, fileDownloadService) {
            this.httpService = httpService;
            this.validationPromise = validationPromise;
            this.fileDownloadService = fileDownloadService;
        }
        PassSalesRepository.prototype.get = function (filter) {
            var _this = this;
            var formatedFilter = this.getFormattedFilter(filter);
            var options = this.getOptions(formatedFilter);
            return this.httpService.get(options).then(function (response) {
                return response.data;
            }).catch(function (response) {
                return _this.validationPromise.rejectWithFirstMessage(response);
            });
        };
        PassSalesRepository.prototype.getCsv = function (filter) {
            var _this = this;
            var csvFilter = angular.copy(filter);
            csvFilter.type = 'csv';
            return this.get(csvFilter).then(function (data) {
                var fileName = _this.getFileName(csvFilter);
                _this.fileDownloadService.downloadAsCsv(data, fileName);
            });
        };
        PassSalesRepository.prototype.getFileName = function (filter) {
            var fromDisplay = moment(filter.from).format('DD-MM-YYYY');
            var toDisplay = moment(filter.to).format('DD-MM-YYYY');
            return "pass_sales_" + fromDisplay + "_" + toDisplay;
        };
        PassSalesRepository.prototype.getFormattedFilter = function (filter) {
            if (!filter.from || !filter.to) {
                throw new Error('From and To need to be provided');
            }
            var formattedFilter = angular.copy(filter);
            formattedFilter.from = moment(filter.from);
            formattedFilter.to = moment(filter.to).add(1, 'day');
            return formattedFilter;
        };
        PassSalesRepository.prototype.getOptions = function (filter) {
            return {
                resource: 'reports/pass-sales',
                parameters: filter,
                block: true
            };
        };
        return PassSalesRepository;
    }());
    angular
        .module('app.reports')
        .service('passSalesRepository', PassSalesRepository);
})(jfc || (jfc = {}));
