(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('todaysEventsService', todaysEventsService);

    /* @ngInject */
    function todaysEventsService($q, simpleApiCaller) {

        var service = {
            getEventsForCheckIn: getEventsForCheckIn
        };

        function getEventsForCheckIn() {
            var search = [
                {
                    field: 'starttime',
                    condition: 'gt',
                    value: moment().format('YYYY-MM-DD')
                },
                {
                    field: 'starttime',
                    condition: 'lt',
                    value: moment().add(1, 'day').format('YYYY-MM-DD')
                }
            ];

            var options = {
                resource: 'stand-alone-events',
                search: search
            };

            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.status === 404) {
                    return [];
                } else {
                    return $q.reject();
                }
            });
        }

        return service;
    }
})();
