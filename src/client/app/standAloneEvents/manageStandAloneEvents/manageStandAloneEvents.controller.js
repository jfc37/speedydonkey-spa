(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .controller('ManageStandAloneEvents', ManageStandAloneEvents);

    /* @ngInject */
    function ManageStandAloneEvents(standAloneEventService) {
        var vm = this;
        vm.events = [];

        vm.statusCount = function (status) {
            return vm.events.filter(function (theEvent) {
                return theEvent.status === status;
            }).length;
        };

        activate();

        function activate() {
            getEvents();
        }

        function getEvents() {
            standAloneEventService.getEvents().then(function (events) {
                vm.events = events;
            });
        }
    }
})();
