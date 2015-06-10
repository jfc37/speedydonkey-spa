(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dashboardService', 'logger', 'authService', 'config'];

    /* @ngInject */
    function Dashboard($q, dashboardService, logger, authService, config) {
        /*jshint validthis: true */
        var vm = this;
        vm.upcomingSchedule = [];
        vm.currentPasses = [];
        vm.todaysClasses = [];
        vm.isScheduleLoading = true;
        vm.arePassesLoading = true;
        vm.areClassesLoading = true;
        vm.canPerformClassCheckIn = authService.hasClaim('Teacher');
        vm.companyName = config.appTitle;

        activate();

        function activate() {
            var promises = [getSchedule(), getCurrentPasses(), getClassesForCheckIn(), getAnnouncements()];
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

        function getClassesForCheckIn() {
            if (!vm.canPerformClassCheckIn) {
                return $q.when();
            }

            return dashboardService.getClassesForCheckIn().then(function (classes) {
                vm.todaysClasses = classes;
                vm.areClassesLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting classes for check in...";
                }
                logger.error(error.displayMessage);
                vm.areClassesLoading = false;
            });
        }

        function getAnnouncements() {
            return dashboardService.getAnnouncements().then(function (announcements) {
                vm.announcements = announcements;
            })
        }
    }
})();
