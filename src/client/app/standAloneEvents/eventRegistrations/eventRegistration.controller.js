(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .controller('EventRegistration', EventRegistration);

    /* @ngInject */
    function EventRegistration(eventRegistration, $q, logger, routehelper, config) {
        var vm = this;

        vm.events = [];

        vm.isAnySelected = function () {
            return getSelected().length > 0;
        };

        vm.submit = function () {
            eventRegistration.register(getSelected()).then(function () {
                routehelper.redirectToRoute('dashboard');
                logger.success('Enrolled in selected blocks');
            }, function () {
                logger.error('Problem with enrolment');
            });
        };

        activate();

        function activate() {
            return getAllEvents();
        }

        function getAllEvents() {
            eventRegistration.getEventsForRegsitration().then(function (events) {
                vm.events = events;
            });
        }

        function getSelected() {
            return vm.events.filter(function (theEvent) {
                return theEvent.registerIn;
            });
        }
    }
})();
