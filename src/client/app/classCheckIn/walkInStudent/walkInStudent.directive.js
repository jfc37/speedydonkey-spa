(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .directive('classWalkInStudent', walkInStudent);

    function walkInStudent() {
        return {
            restrict: 'E',
            scope: {
                'theClass': '='
            },
            templateUrl: 'app/classCheckIn/walkInStudent/walkInStudent.html',
            controllerAs: 'vm',
            bindToController: true,
            /* @ngInject */
            controller: function (classAttendence, blockEnrolmentRepository, createNewUserModal, niceAlert) {
                var vm = this;

                vm.isSelectedStudentValid = function () {
                    return vm.student && vm.student.id;
                };

                vm.addWalkIn = function () {
                    vm.student.attendedClass = true;
                    classAttendence.tryAttendClass(vm.student, vm.theClass).then(function () {

                    }, function (reason) {
                        niceAlert.error(reason);
                    }).finally(function () {
                        vm.student = '';
                    });
                };

                vm.enrolWalkIn = function () {
                    blockEnrolmentRepository.enrol(vm.theClass.block, vm.student).then(function () {
                        niceAlert.success(vm.student.fullName + ' has been enrolled in the block.');
                    }, function (message) {
                        niceAlert.error('Problem enrolling ' + vm.student.fullName + ' in the block...');
                    }).finally(vm.addWalkIn);
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
