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
            getCurrentPasses: getCurrentPasses
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

        return service;
    }
})();
