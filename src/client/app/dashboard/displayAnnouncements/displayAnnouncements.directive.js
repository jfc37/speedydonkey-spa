(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('displayAnnouncements', displayAnnouncements);

    /* @ngInject */
    function displayAnnouncements(dashboardService, config) {

        return {
            restrict: 'E',
            templateUrl: 'app/dashboard/displayAnnouncements/displayAnnouncements.html',
            controllerAs: 'vm',
            controller: function () {
                var vm = this;
                vm.companyName = config.appTitle;

                getAnnouncements();

                function getAnnouncements() {
                    return dashboardService.getAnnouncements().then(function (announcements) {
                        vm.announcements = announcements;
                    });
                }
            }
        };
    }
})();
