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
            controller: function (classAttendence) {
                var vm = this;

                vm.attendClass = function (student) {
                    classAttendence.tryAttendClass(student, vm.theClass).then(function () {
                        vm.students.remove(student);
                    });
                };
            }
        };
    }
})();
