(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .directive('eventAttendingStudents', attendingStudents);

    function attendingStudents() {
        return {
            restrict: 'E',
            scope: {
                'students': '=',
                'theEvent': '='
            },
            templateUrl: 'app/standAloneEvents/checkIn/attendingStudents/attendingStudents.html',
            controllerAs: 'vm',
            bindToController: true,
            /* @ngInject */
            controller: function (eventAttendence) {
                var vm = this;

                vm.attendEvent = function (student) {
                    eventAttendence.tryUnattendEvent(student, vm.theEvent).then(function () {
                        vm.students.remove(student);
                    }, function () {
                        student.attendedEvent = false;
                    });
                };
            }
        };
    }
})();
