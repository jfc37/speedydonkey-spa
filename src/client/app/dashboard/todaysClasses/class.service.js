(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('todaysClassesService', todaysClassesService);

    /* @ngInject */
    function todaysClassesService($q, simpleApiCaller) {

        var service = {
            getClassesForCheckIn: getClassesForCheckIn
        };

        function getClassesForCheckIn() {
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
                resource: 'classes',
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
