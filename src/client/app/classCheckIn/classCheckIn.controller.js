(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .controller('ClassCheckIn', ClassCheckIn);

    /* @ngInject */
    function ClassCheckIn($q, $routeParams, classAttendence, classRepository) {
        /*jshint validthis: true */
        var vm = this;
        vm.registeredStudents = classAttendence.studentsRegistered;
        vm.attendingStudents = classAttendence.studentsAttending;

        activate();

        function activate() {
            return getClass();
        }

        function getClass() {
            return classRepository.get($routeParams.id).then(function (theClass) {
                vm.class = theClass;

                var includedStudentIds = [];

                theClass.actualStudents.forEach(function (student) {
                    student.attendedClass = true;
                });

                theClass.registeredStudents.concat(theClass.actualStudents).forEach(function (student) {
                    if (includedStudentIds.indexOf(student.id) < 0) {
                        includedStudentIds.push(student.id);

                        if (student.attendedClass) {
                            vm.attendingStudents.push(student);
                        } else {
                            vm.registeredStudents.push(student);
                        }
                    }

                });

            });
        }
    }
})();
