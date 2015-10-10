(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .controller('ClassCheckIn', ClassCheckIn);

    /* @ngInject */
    function ClassCheckIn($q, classCheckInService, registerUserService, purchasePassService, logger, validationService, blockUI) {
        /*jshint validthis: true */
        var vm = this;
        vm.class = null;
        vm.students = [];
        vm.creatingNewAccount = false;
        vm.newUser = {};

        vm.attendenceStatusChanged = function (student) {
            classCheckInService.attendenceStatusChanged(student).then(function (message) {
                logger.success(message);
            }, function (message) {
                logger.error(message);
            });
        };

        vm.addWalkIn = function () {
            var addedStudent = vm.walkInStudentSelected;
            addedStudent.attendedClass = true;
            classCheckInService.getPassesForStudent(addedStudent).then(function () {
                classCheckInService.attendenceStatusChanged(addedStudent).then(function (message) {
                    logger.success(message);
                }, function (message) {
                    logger.error(message);
                    addedStudent.openPassSelection = true;
                });
                vm.students.push(addedStudent);
                vm.walkInStudentSelected = '';
            });
        };

        vm.enrolWalkIn = function () {
            classCheckInService.enrolStudent(vm.walkInStudentSelected.id, vm.class.block.id).then(function () {
                logger.success('Enrolled ' + vm.walkInStudentSelected.fullName + ' in the block');
            }, function (message) {
                logger.error('Problem enrolling ' + vm.walkInStudentSelected.fullName + ' in the block...');
            }).then(vm.addWalkIn);
        };

        vm.isSelectedStudentValid = function () {
            return vm.walkInStudentSelected && vm.walkInStudentSelected.id;
        };

        vm.createAccount = function () {
            vm.newUser = {};
            if (vm.walkInStudentSelected) {
                var splitName = vm.walkInStudentSelected.split(' ');
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
                vm.walkInStudentSelected = user;
            }, function (validationErrors) {
                validationService.applyServerSideErrors(form, validationErrors);
            });
        };

        vm.cancelNewAccount = function () {
            vm.creatingNewAccount = false;
            vm.newUser = {};
        };

        vm.purchaseNewPass = function (student, passOption) {
            blockUI.start();
            vm.disablePassPurchase = true;
            classCheckInService.purchaseNewPass(student, passOption).then(function () {
                blockUI.stop();
                logger.success(student.fullName + ' purchased a new pass!');
                vm.disablePassPurchase = false;
            }, function () {
                blockUI.stop();
                logger.error('Problem purchasing pass...');
                vm.disablePassPurchase = false;
            });
        };

        vm.passPaidFor = function (pass, student) {
            classCheckInService.passPaidFor(pass).then(function () {
                logger.success('Pass paid for');
            }, function () {
                logger.error('Problem paying for pass...');
            });
        };

        activate();

        function activate() {
            blockUI.start();
            var promises = [getClass(), getStudents(), getPassOptions()];
            return $q.all(promises)
                .then(function () {
                    blockUI.stop();
                });
        }

        function getClass() {
            return classCheckInService.getClass().then(function (theClass) {
                vm.class = theClass;
            });
        }

        function getStudents() {
            return classCheckInService.getStudents().then(function (students) {
                vm.students = students;
            });
        }

        function getPassOptions() {
            return purchasePassService.getPassOptions(true).then(function (passOptions) {
                vm.passOptions = passOptions;
            });
        }
    }
})();
