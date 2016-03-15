(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .controller('StandAloneEventCheckIn', StandAloneEventCheckIn);

    /* @ngInject */
    function StandAloneEventCheckIn($routeParams, standAloneEventService, eventAttendence, niceAlert) {
        var vm = this;
        vm.registeredStudents = eventAttendence.studentsRegistered;
        vm.attendingStudents = eventAttendence.studentsAttending;

        activate();

        function activate() {
            return getEvent();
        }

        function getEvent() {
            return standAloneEventService.getEvent($routeParams.id).then(function (theEvent) {
                vm.event = theEvent;

                var includedStudentIds = [];

                theEvent.actualStudents.forEach(function (student) {
                    student.attendedEvent = true;
                });

                theEvent.actualStudents.forEach(function (student) {
                    includedStudentIds.push(student.id);
                    vm.attendingStudents.push(student);
                });

                theEvent.registeredStudents.forEach(function (student) {
                    if (includedStudentIds.indexOf(student.id) < 0) {
                        includedStudentIds.push(student.id);
                        vm.registeredStudents.push(student);
                    }

                });

            }, function () {
                niceAlert.error('Problem loading event details.');
            });
        }
    }
})();
