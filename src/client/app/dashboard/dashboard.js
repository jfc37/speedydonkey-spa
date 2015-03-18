(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dashboardService', 'logger'];

    /* @ngInject */
    function Dashboard($q, dashboardService, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.upcomingSchedule = [];
        vm.currentPasses = [];
        vm.isScheduleLoading = true;
        vm.arePassesLoading = true;

        activate();

        function activate() {
            var promises = [getSchedule(), getCurrentPasses()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Dashboard View');
            });
        }

        function getSchedule() {
            return dashboardService.getSchedule().then(function (schedule) {
                vm.upcomingSchedule = schedule;
                vm.isScheduleLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting schedule...";
                }
                logger.error(error.displayMessage);
                vm.isScheduleLoading = false;
            });
        }

        function getCurrentPasses() {
            return dashboardService.getCurrentPasses().then(function (passes) {
                vm.currentPasses = passes;
                vm.arePassesLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting passes...";
                }
                logger.error(error.displayMessage);
                vm.arePassesLoading = false;
            });
        }
    }
})();
