var jfc;
(function (jfc) {
    'use strict';
    var BlockSummaryRepository = (function () {
        /* @ngInject */
        function BlockSummaryRepository(httpService, validationPromise, fileDownloadService) {
            this.httpService = httpService;
            this.validationPromise = validationPromise;
            this.fileDownloadService = fileDownloadService;
        }
        BlockSummaryRepository.prototype.get = function (filter) {
            var _this = this;
            var formatedFilter = this.getFormattedFilter(filter);
            var options = this.getOptions(formatedFilter);
            return this.httpService.get(options).then(function (response) {
                return response.data;
            }).catch(function (response) {
                return _this.validationPromise.rejectWithFirstMessage(response);
            });
        };
        BlockSummaryRepository.prototype.getCsv = function (filter) {
            var _this = this;
            var csvFilter = angular.copy(filter);
            csvFilter.type = 'csv';
            return this.get(csvFilter).then(function (data) {
                var fileName = _this.getFileName(csvFilter);
                _this.fileDownloadService.downloadAsCsv(data, fileName);
            });
        };
        BlockSummaryRepository.prototype.getFileName = function (filter) {
            var fromDisplay = moment(filter.from).format('DD-MM-YYYY');
            var toDisplay = moment(filter.to).format('DD-MM-YYYY');
            return "block_summary_" + fromDisplay + "_" + toDisplay;
        };
        BlockSummaryRepository.prototype.getFormattedFilter = function (filter) {
            if (!filter.from || !filter.to) {
                throw new Error('From and To need to be provided');
            }
            var formattedFilter = angular.copy(filter);
            formattedFilter.from = moment(filter.from);
            formattedFilter.to = moment(filter.to).add(1, 'day');
            return formattedFilter;
        };
        BlockSummaryRepository.prototype.getOptions = function (filter) {
            return {
                resource: 'reports/block-summary',
                parameters: filter,
                block: true
            };
        };
        return BlockSummaryRepository;
    }());
    angular
        .module('app.reports')
        .service('blockSummaryRepository', BlockSummaryRepository);
})(jfc || (jfc = {}));
