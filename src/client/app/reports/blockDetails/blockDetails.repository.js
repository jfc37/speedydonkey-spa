var jfc;
(function (jfc) {
    'use strict';
    /* @ngInject */
    var BlockDetailsRepository = (function () {
        function BlockDetailsRepository(httpService, validationPromise, fileDownloadService) {
            this.httpService = httpService;
            this.validationPromise = validationPromise;
            this.fileDownloadService = fileDownloadService;
        }
        BlockDetailsRepository.prototype.get = function (filter) {
            var _this = this;
            var options = this.getOptions(filter);
            return this.httpService.get(options).then(function (response) {
                return response.data;
            }).catch(function (response) {
                return _this.validationPromise.rejectWithFirstMessage(response);
            });
        };
        BlockDetailsRepository.prototype.getCsv = function (filter) {
            var _this = this;
            var csvFilter = angular.copy(filter);
            csvFilter.type = 'csv';
            return this.get(csvFilter).then(function (data) {
                var fileName = _this.getFileName(csvFilter);
                _this.fileDownloadService.downloadAsCsv(data, fileName);
            });
        };
        BlockDetailsRepository.prototype.getFileName = function (filter) {
            return 'block_details_' + filter.blockId;
        };
        BlockDetailsRepository.prototype.getOptions = function (filter) {
            return {
                resource: 'reports/block-details',
                parameters: filter,
                block: true
            };
        };
        return BlockDetailsRepository;
    }());
    angular
        .module('app.reports')
        .service('blockDetailsRepository', BlockDetailsRepository);
})(jfc || (jfc = {}));
