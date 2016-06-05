(function () {
    'use strict';

    angular
        .module('app.reports')
        .factory('blockDetailsRepository', blockDetailsRepository);

    /* @ngInject */
    function blockDetailsRepository(simpleApiCaller, validationPromise, fileDownloadService) {
        var service = {
            get: get,
            getCsv: getCsv
        };

        return service;

        function get(filter) {

            var options = getOptions(filter);

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
            return 'block_details_' + filter.blockId;
        }

        function getOptions(filter) {
            return {
                resource: 'reports/block-details',
                parameters: filter,
                block: true
            };
        }
    }
})();
