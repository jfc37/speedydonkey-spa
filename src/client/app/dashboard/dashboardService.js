(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('dashboardService', dashboardService);

    dashboardService.$inject = ['$q', 'dataservice', 'logger', 'authService'];

    /* @ngInject */
    function dashboardService($q, dataservice, logger, authService) {
        /*jshint validthis: true */
        
        var service = {
            getSchedule: getSchedule,
            getCurrentPasses: getCurrentPasses,
            getClassesForCheckIn: getClassesForCheckIn
        };

        function getSchedule() {
            return $q(function (resolve, reject) {
                dataservice.getUserSchedule(authService.getUserIdentity().userId).then(function(schedule) {
                    resolve(schedule);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'Nothing scheduled yet...';
                    }
                    reject(response);
                });
            });
        }

        function getCurrentPasses() {
            return $q(function (resolve, reject) {
                dataservice.getUserCurrentPasses(authService.getUserIdentity().userId).then(function(passes) {
                    resolve(passes);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'No current passes...';
                    }
                    reject(response);
                });
            });
        }

        function getClassesForCheckIn() {
            return $q(function (resolve, reject) {
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
                dataservice.searchForClasses(search).then(function(response) {
                    resolve(response.data);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'No classes for today...';
                    }
                    reject(response);
                });
            });
        }

        return service;
    }
})();
