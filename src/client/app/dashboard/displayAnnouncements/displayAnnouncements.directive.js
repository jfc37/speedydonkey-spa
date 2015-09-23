(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('displayAnnouncements', displayAnnouncements);

    /* @ngInject */
    function displayAnnouncements(announcementsService, config) {

        return {
            restrict: 'E',
            templateUrl: 'app/dashboard/displayAnnouncements/displayAnnouncements.html',
            controllerAs: 'vm',
            scope: true,
            controller: function () {
                var vm = this;
                vm.companyName = config.appTitle;

                getAnnouncements();

                function getAnnouncements() {
                    return announcementsService.getAnnouncements().then(function (announcements) {
                        vm.announcements = announcements;
                    });
                }
            }
        };
    }
})();
