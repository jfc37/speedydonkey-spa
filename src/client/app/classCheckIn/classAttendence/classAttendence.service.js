(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('classAttendence', classAttendence);

    /* @ngInject */
    function classAttendence($q, niceAlert, commonFunctions, purchasePassModal, classAttendenceRepository, studentPassRepository) {
        var studentsAttending = [];
        var studentsRegistered = [];

        var service = {
            reset: reset,

            tryAttendClass: tryAttendClass,
            tryUnattendClass: tryUnattendClass,

            studentsAttending: studentsAttending,
            studentsRegistered: studentsRegistered
        };

        return service;

        function reset() {
            studentsAttending.length = 0;
            studentsRegistered.length = 0;
        }

        function tryUnattendClass(student, theClass) {
            return classAttendenceRepository.unattend(student, theClass).then(function () {
                changeStatus(student, studentsAttending, studentsRegistered);
                niceAlert.success({
                    message: student.firstName + ' has been removed from the class.'
                });
            }, function () {
                undoMove(student);
            });
        }

        function undoMove(student) {
            student.attendedClass = !student.attendedClass;
        }

        function changeStatus(student, from, to) {
            from.remove(student);
            to.push(student);
        }

        function tryAttendClass(student, theClass) {
            var deferred = $q.defer();

            if (isAlreadyAttending(student)) {
                deferred.reject('Already attending.');
            }

            studentPassRepository.get(student).then(function (passes) {
                student.passes = passes;

                if (checkPassStatus(student)) {
                    addStudentToClass(student, theClass).then(deferred.resolve, deferred.reject);
                } else {
                    purchasePassModal.open(student).then(function () {
                        addStudentToClass(student, theClass).then(deferred.resolve, deferred.reject);
                    }, function () {
                        undoMove(student);
                        deferred.reject();
                    });
                }
            });

            return deferred.promise;
        }

        function isAlreadyAttending(student) {
            return studentsAttending.map(function (attendee) {
                return attendee.id;
            }).contains(student.id);
        }

        function addStudentToClass(student, theClass) {
            return classAttendenceRepository.attend(student, theClass).then(function () {
                changeStatus(student, studentsRegistered, studentsAttending);
                niceAlert.success({
                    message: 'Welcome to class ' + student.firstName + '!'
                });
            });

        }

        function checkPassStatus(student) {
            if (!student.passes.some(commonFunctions.isValidPass)) {
                return false;
            }
            if (!student.passes.some(commonFunctions.isPaidPass)) {
                return false;
            }

            return true;
        }
    }
})();
