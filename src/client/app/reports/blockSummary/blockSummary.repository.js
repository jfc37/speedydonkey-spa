(function () {
    'use strict';

    angular
        .module('app.reports')
        .factory('blockSummaryRepository', blockSummaryRepository);

    /* @ngInject */
    function blockSummaryRepository(simpleApiCaller, validationPromise, fileDownloadService) {
        var service = {
            get: get,
            getCsv: getCsv
        };

        return service;

        function get(filter) {
            var formatedFilter = getFormattedFilter(filter);

            var options = getOptions(formatedFilter);

            return simpleApiCaller.get(options).then(function(response) {
                return response.data;
            }).catch(function (response) {
                return validationPromise.rejectWithFirstMessage(response);
            });
        }

        function getCsv(filter) {
            var csvFilter = angular.copy(filter);
            csvFilter.type = 'csv';

            return get(csvFilter).then(function(data) {
                var fileName = getFileName(csvFilter);
                fileDownloadService.downloadAsCsv(data, fileName);
            });
        }

        function getFileName(filter) {
            var fromDisplay = moment(filter.from).format('DD-MM-YYYY');
            var toDisplay = moment(filter.to).format('DD-MM-YYYY');
            return 'block_summary_' + fromDisplay + '_' + toDisplay;
        }

        function getFormattedFilter(filter) {
            if (!filter.from || !filter.to) {
                throw new Error('From and To need to be provided');
            }

            var formattedFilter = angular.copy(filter);

            formattedFilter.from = moment(filter.from);
            formattedFilter.to = moment(filter.to).add(1, 'day');

            return formattedFilter;
        }

        function getOptions(filter) {
            return {
                resource: 'reports/block-summary',
                parameters: filter,
                block: true
            };
        }
    }
})();
