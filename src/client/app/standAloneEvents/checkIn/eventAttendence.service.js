(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .factory('eventAttendence', eventAttendence);

    /* @ngInject */
    function eventAttendence($q, niceAlert, eventAttendenceRepository) {
        var studentsAttending = [];
        var studentsRegistered = [];

        var service = {
            reset: reset,

            tryAttendEvent: tryAttendEvent,
            tryUnattendEvent: tryUnattendEvent,

            studentsAttending: studentsAttending,
            studentsRegistered: studentsRegistered
        };

        return service;

        function reset() {
            studentsAttending.length = 0;
            studentsRegistered.length = 0;
        }

        function tryUnattendEvent(student, theEvent) {
            return eventAttendenceRepository.unattend(student, theEvent).then(function () {
                changeStatus(student, studentsAttending, studentsRegistered);
                niceAlert.success({
                    message: student.firstName + ' has been removed from the event.'
                });
            }, function () {
                undoMove(student);
            });
        }

        function undoMove(student) {
            student.attendedEvent = !student.attendedEvent;
        }

        function changeStatus(student, from, to) {
            from.remove(student);
            to.push(student);
        }

        function tryAttendEvent(student, theEvent) {
            var deferred = $q.defer();

            if (isAlreadyAttending(student)) {
                deferred.reject('Already attending.');
            }

            addStudentToEvent(student, theEvent).then(deferred.resolve, deferred.reject);

            return deferred.promise;
        }

        function isAlreadyAttending(student) {
            return studentsAttending.map(function (attendee) {
                return attendee.id;
            }).contains(student.id);
        }

        function addStudentToEvent(student, theEvent) {
            return eventAttendenceRepository.attend(student, theEvent).then(function () {
                changeStatus(student, studentsRegistered, studentsAttending);
                niceAlert.success({
                    message: 'Welcome to event ' + student.firstName + '!'
                });
            });
        }
    }
})();
