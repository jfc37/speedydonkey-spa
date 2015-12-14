(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .factory('standAloneEventService', standAloneEventService);

    /* @ngInject */
    function standAloneEventService($q, simpleApiCaller) {

        var service = {
            create: create,
            update: update,
            getEvents: getEvents,
            getEvent: getEvent
        };

        function create(standAloneEvent) {
            return simpleApiCaller.post(standAloneEvent, getOptions()).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.validationResult) {
                    return response.validationResult.validationErrors;
                }
            });
        }

        function update(standAloneEvent) {
            var options = getOptions();
            options.id = standAloneEvent.id;

            return simpleApiCaller.put(standAloneEvent, options).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.validationResult) {
                    return response.validationResult.validationErrors;
                }
            });
        }

        function getEvents() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                var events = response.data;

                var today = new Date();
                events.forEach(function (theEvent) {
                    if (moment(theEvent.endDate).isBefore(today)) {
                        theEvent.status = 'Past';
                    } else if (moment(theEvent.startDate).isAfter(today)) {
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
                var theEvent = response.data;

                theEvent.actualStudents.forEach(function (student) {
                    student.isPresent = true;
                });

                theEvent.registeredStudents.forEach(function (registeredStudent) {
                    if (theEvent.actualStudents.filter(function (attendingStudent) {
                            return attendingStudent.id === registeredStudent.id;
                        }).length === 0) {
                        theEvent.acutalStudents.push(registeredStudent);
                    }
                });

                return theEvent;
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
