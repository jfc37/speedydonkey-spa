(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .directive('attendingStudents', attendingStudents);

    function attendingStudents() {
        return {
            restrict: 'E',
            scope: {
                'students': '=',
                'theClass': '='
            },
            templateUrl: 'app/classCheckIn/attendingStudents/attendingStudents.html',
            controllerAs: 'vm',
            bindToController: true,
            /* @ngInject */
            controller: function (classAttendence, studentPassesModal) {
                var vm = this;

                vm.attendClass = function (student) {
                    classAttendence.tryUnattendClass(student, vm.theClass).then(function () {
                        vm.students.remove(student);
                    }, function () {
                        student.attendedClass = false;
                    });
                };

                vm.launchStudentPasses = function (student) {
                    studentPassesModal.open(student.id);
                };
            }
        };
    }
})();
