(function () {
    'use strict';

    angular
        .module('app.reports')
        .factory('teacherInvoiceRepository', teacherInvoiceRepository);

    /* @ngInject */
    function teacherInvoiceRepository(simpleApiCaller) {
        var service = {
            get: get
        };

        return service;

        function get(filter) {
            if (!filter.from || !filter.to) {
                throw new Error('From and To need to be provided');
            }

            var formatedFilter = {
                from: moment(filter.from),
                to: moment(filter.to).add(1, 'day')
            };

            var options = {
                resource: 'reports/teacher-invoices',
                parameters: formatedFilter,
                block: true
            };

            return simpleApiCaller.get(options).then(function(response) {
                return response.data;
            });
        }
    }
})();
