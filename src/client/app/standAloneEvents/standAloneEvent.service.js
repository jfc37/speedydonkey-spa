(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .factory('standAloneEventService', standAloneEventService);

    /* @ngInject */
    function standAloneEventService($q, simpleApiCaller, validationPromise) {

        var service = {
            create: create,
            update: update,
            getEvents: getEvents,
            getEvent: getEvent,
            deleteEvents: deleteEvents
        };

        function deleteEvent(theEvent) {
            var options = getOptions();
            options.id = theEvent.id;

            return simpleApiCaller.delete(options);
        }

        function deleteEvents(events) {
            var deletePromises = [];

            events.forEach(function (theEvent) {
                deletePromises.push(deleteEvent(theEvent));
            });

            return $q.all(deletePromises);
        }

        function create(standAloneEvent) {
            return simpleApiCaller.post(standAloneEvent, getOptions()).then(function (response) {
                return response.data;
            }, function (response) {
                return validationPromise.reject(response);
            });
        }

        function update(standAloneEvent) {
            var options = getOptions();
            options.id = standAloneEvent.id;

            return simpleApiCaller.put(standAloneEvent, options).then(function (response) {
                return response.data;
            }, function (response) {
                return validationPromise.reject(response);
            });
        }

        function getEvents() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                var events = response.data;

                var today = new Date();
                events.forEach(function (theEvent) {
                    if (moment(theEvent.startTime).isBefore(today, 'day')) {
                        theEvent.status = 'Past';
                    } else if (moment(theEvent.startTime).isAfter(today, 'day')) {
                        theEvent.status = 'Future';
                    } else {
                        theEvent.status = 'Current';
                    }
                });

                return events;
            });
        }

        function getEvent(id) {
            var options = getOptions();
            options.id = id;

            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            });
        }

        function getOptions() {
            return {
                resource: 'stand-alone-events',
                block: true
            };
        }

        return service;

    }
})();
