(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('upcomingSchedule', upcomingSchedule);

    /* @ngInject */
    function upcomingSchedule(upcomingScheduleService) {

        return {
            restrict: 'E',
            templateUrl: 'app/dashboard/upcomingSchedule/upcomingSchedule.html',
            controllerAs: 'vm',
            scope: true,
            controller: function () {
                var vm = this;

                activate();

                function activate() {
                    return upcomingScheduleService.getSchedule().then(function (schedule) {
                        vm.upcomingSchedule = schedule;
                    }, function () {
                        vm.errorMessage = 'Oops, we couldn\'t get your upcoming schedule';
                    });
                }
            }
        };
    }
})();
