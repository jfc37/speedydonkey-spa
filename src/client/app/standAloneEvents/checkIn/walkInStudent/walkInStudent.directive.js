(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .directive('eventWalkInStudent', walkInStudent);

    function walkInStudent() {
        return {
            restrict: 'E',
            scope: {
                'theEvent': '='
            },
            templateUrl: 'app/standAloneEvents/checkIn/walkInStudent/walkInStudent.html',
            controllerAs: 'vm',
            bindToController: true,
            /* @ngInject */
            controller: function (eventAttendence, createNewUserModal, niceAlert) {
                var vm = this;

                vm.isSelectedStudentValid = function () {
                    return vm.student && vm.student.id;
                };

                vm.addWalkIn = function () {
                    vm.student.attendedEvent = true;
                    eventAttendence.tryAttendEvent(vm.student, vm.theEvent).then(function () {

                    }, function (reason) {
                        niceAlert.error(reason);
                    }).finally(function () {
                        vm.student = '';
                    });
                };

                vm.createAccount = function () {
                    createNewUserModal.open(vm.student).then(function (user) {
                        vm.student = user;
                        vm.addWalkIn();
                    });
                };
            }
        };
    }
})();
