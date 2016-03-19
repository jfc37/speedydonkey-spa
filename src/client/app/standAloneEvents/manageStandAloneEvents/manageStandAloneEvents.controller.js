(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .controller('ManageStandAloneEvents', ManageStandAloneEvents);

    /* @ngInject */
    function ManageStandAloneEvents(standAloneEventService) {
        var vm = this;

        vm.futureEvents = [];
        vm.pastEvents = [];
        vm.currentEvents = [];

        activate();

        function activate() {
            getEvents();
        }

        function getEvents() {
            standAloneEventService.getEvents().then(function (events) {
                vm.futureEvents = getEventsOfStatus(events, 'Future');
                vm.pastEvents = getEventsOfStatus(events, 'Past');
                vm.currentEvents = getEventsOfStatus(events, 'Current');
            });
        }

        function getEventsOfStatus(events, status) {
            return events.filter(function (theEvent) {
                return theEvent.status === status;
            });
        }
    }
})();
