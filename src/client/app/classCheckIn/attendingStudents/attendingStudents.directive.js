(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .directive('attendingStudents', attendingStudents);

    /* @ngInject */
    function attendingStudents(classAttendence) {
        return {
            restrict: 'E',
            scope: {
                'students': '=',
                'theClass': '='
            },
            templateUrl: 'app/classCheckIn/attendingStudents/attendingStudents.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: function () {
                var vm = this;

                vm.attendClass = function (student) {
                    classAttendence.tryUnattendClass(student, vm.theClass).then(function () {
                        vm.students.remove(student);
                    }, function () {
                        student.attendedClass = false;
                    });
                };
            }
        };
    }
})();
