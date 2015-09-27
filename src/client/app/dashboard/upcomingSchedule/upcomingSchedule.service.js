(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('upcomingScheduleService', upcomingScheduleService);

    /* @ngInject */
    function upcomingScheduleService($q, simpleApiCaller) {
        /*jshint validthis: true */

        var service = {
            getSchedule: getSchedule,
        };

        function getSchedule() {
            var options = {
                resource: 'users/current/schedules'
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
