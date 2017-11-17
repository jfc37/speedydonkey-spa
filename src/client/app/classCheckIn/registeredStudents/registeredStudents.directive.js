(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .directive('registeredStudents', registeredStudents);

    function registeredStudents() {
        return {
            restrict: 'E',
            scope: {
                'students': '=',
                'theClass': '='
            },
            templateUrl: 'app/classCheckIn/registeredStudents/registeredStudents.html',
            controllerAs: 'vm',
            bindToController: true,
            /* @ngInject */
            controller: function (classAttendence, studentPassesModal) {
                var vm = this;

                vm.attendClass = function (student) {
                    classAttendence.tryAttendClass(student, vm.theClass).then(function () {
                        vm.students.remove(student);
                    });
                };

                vm.launchStudentPasses = function (student) {
                    studentPassesModal.open(student.id);
                };

                vm.unenrol = function (student) {
                    classAttendence.unenrolStudent(student, vm.theClass.block.id).then(function () {
                        vm.students.remove(student);
                    });
                };
            }
        };
    }
})();
