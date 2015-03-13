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
            getSchedule: getSchedule
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

        return service;
    }
})();
