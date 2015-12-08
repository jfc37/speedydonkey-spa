(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .controller('StandAloneEventCheckIn', StandAloneEventCheckIn);

    /* @ngInject */
    function StandAloneEventCheckIn($routeParams, standAloneEventService) {
        var vm = this;

        activate();

        function activate() {
            getEvent();
        }

        function getEvent() {
            standAloneEventService.getEvent($routeParams.id).then(function (theEvent) {
                vm.event = theEvent;
                vm.students = theEvent.registeredStudents;
            });
        }
    }
})();
