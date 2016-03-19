(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .directive('eventRegisteredStudents', registeredStudents);

    function registeredStudents() {
        return {
            restrict: 'E',
            scope: {
                'students': '=',
                'theEvent': '='
            },
            templateUrl: 'app/standAloneEvents/checkIn/registeredStudents/registeredStudents.html',
            controllerAs: 'vm',
            bindToController: true,
            /* @ngInject */
            controller: function (eventAttendence) {
                var vm = this;

                vm.attendEvent = function (student) {
                    eventAttendence.tryAttendEvent(student, vm.theEvent).then(function () {
                        vm.students.remove(student);
                    });
                };
            }
        };
    }
})();
