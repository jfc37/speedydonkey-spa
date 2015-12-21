(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .directive('walkInStudent', walkInStudent);

    /* @ngInject */
    function walkInStudent(registerUserService, validationService) {
        return {
            restrict: 'E',
            bindToController: true,
            controllerAs: 'vm',
            templateUrl: 'app/standAloneEvents/checkIn/walkInStudent/walkInStudent.html',
            scope: {
                students: '='
            },
            /*@ngInject*/
            controller: function () {
                var vm = this;

                vm.addWalkIn = function () {
                    vm.students.push(angular.copy(vm.selectedStudent));

                    vm.selectedStudent = undefined;
                };

                vm.createAccount = function () {
                    vm.newUser = {};
                    if (vm.selectedStudent) {
                        var splitName = vm.selectedStudent.split(' ');
                        if (splitName.length > 0) {
                            vm.newUser.firstName = splitName[0];
                        }
                        if (splitName.length > 1) {
                            vm.newUser.surname = splitName[1];
                        }
                    }

                    vm.creatingNewAccount = true;
                };

                vm.registerNewUser = function (form) {
                    registerUserService.register(vm.newUser, true).then(function (user) {
                        vm.creatingNewAccount = false;
                        vm.selectedStudent = user;

                        vm.addWalkIn();
                    }, function (validationErrors) {
                        validationService.applyServerSideErrors(form, validationErrors);
                    });
                };
            }
        };
    }
})();
