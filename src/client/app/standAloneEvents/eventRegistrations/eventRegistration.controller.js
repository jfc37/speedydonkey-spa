(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .controller('EventRegistration', EventRegistration);

    /* @ngInject */
    function EventRegistration(eventRegistration, niceAlert, routehelper) {

        var vm = this;

        vm.title = 'Event Registration';
        vm.eventsByDays = [];

        vm.anyEvents = function () {
            return vm.eventsByDays.length > 0;
        };

        vm.isAnyEventsSelected = function () {
            return getSelectedEvents().length > 0;
        };

        vm.submit = function () {
            eventRegistration.register(getSelectedEvents()).then(function () {
                niceAlert.success({
                    message: 'You\'re now registered!'
                });
                routehelper.redirectToRoute('dashboard');
            }, function () {
                niceAlert.error({
                    message: 'Something went wrong when we tried to register you. Please try again.'
                });
            });
        };

        activate();

        function activate() {
            return getAllEvents();
        }

        function getAllEvents() {
            return eventRegistration.getEventsForRegsitration().then(function (events) {
                var days = getDaysEventsRunOver(events);
                days.forEach(function (day) {
                    var eventsOnDay = events.filter(function (theEvent) {
                        return isEventOnDay(theEvent, day);
                    });

                    vm.eventsByDays.push({
                        day: day,
                        events: eventsOnDay,
                        title: day.format('dddd, Do of MMMM')
                    });
                });
            });
        }

        function getDaysEventsRunOver(events) {
            return events.map(function (theEvent) {
                return moment(theEvent.startTime).startOf('day');
            }).distinct();
        }

        function isEventOnDay(theEvent, day) {
            return moment(theEvent.startTime).isSame(day, 'day');
        }

        function getSelectedEvents() {
            var selectedEvents = [];

            vm.eventsByDays.forEach(function (eventsByDay) {
                selectedEvents = selectedEvents.concat(eventsByDay.events.filter(function (theEvent) {
                    return theEvent.registerIn;
                }));
            });

            return selectedEvents;
        }
    }
})();
