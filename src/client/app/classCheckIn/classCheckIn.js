(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .controller('ClassCheckIn', ClassCheckIn);

    ClassCheckIn.$inject = ['$q', 'classCheckInService', 'registerUserService', 'blockEnrolmentService', 'logger'];

    /* @ngInject */
    function ClassCheckIn($q, classCheckInService, registerUserService, blockEnrolmentService, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.class = null;
        vm.students = [];
        vm.isClassLoading = true;
        vm.areRegisteredStudentsLoading = true;
        vm.creatingNewAccount = false;
        vm.newUser = {};

        vm.attendenceStatusChanged = function(student) {
            classCheckInService.attendenceStatusChanged(student).then(function(message) {
                logger.success(message);
            }, function(message) {
                logger.error(message);
            });
        };

        vm.searchUsers = function (name) {
            return classCheckInService.searchUsers(name);
        };

        vm.addWalkIn = function () {
            vm.walkInStudentSelected.attendedClass = true;
                classCheckInService.getPassesForStudent(vm.walkInStudentSelected).then(function (){
                    classCheckInService.attendenceStatusChanged(vm.walkInStudentSelected).then(function(message) {
                    logger.success(message);
                }, function(message) {
                    logger.error(message);
                });
                vm.students.push(vm.walkInStudentSelected);
                vm.walkInStudentSelected = '';
            });
        };

        vm.enrolWalkIn = function () {
            classCheckInService.enrolStudent(vm.walkInStudentSelected.id, vm.class.block.id).then(function() {
                logger.success('Enroled ' + vm.walkInStudentSelected.full_name + ' in the block');
            }, function(message) {
                logger.error('Problem enroling ' + vm.walkInStudentSelected.full_name + ' in the block...');
            }).then(vm.addWalkIn);
        };

        vm.isSelectedStudentValid = function () {
            return vm.walkInStudentSelected && vm.walkInStudentSelected.id;
        };

        vm.createAccount = function () {
            vm.newUser = {};
            if (vm.walkInStudentSelected){
                var splitName = vm.walkInStudentSelected.split(' ');
                if (splitName.length > 0) {
                    vm.newUser.first_name = splitName[0];
                }
                if (splitName.length > 1) {
                    vm.newUser.surname = splitName[1];
                }
            }
            
            vm.creatingNewAccount = true;
        };

        vm.registerNewUser = function(form) {
            registerUserService.register(vm.newUser, true).then(function (user) {
                vm.creatingNewAccount = false;
                vm.walkInStudentSelected = user;
            }, function (validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
                logger.warning("Register failed");

            });
        };

        vm.cancelNewAccount = function() {
            vm.creatingNewAccount = false;
            vm.newUser = {};
        };

        activate();

        function activate() {
            var promises = [getClass(), getStudents(), getPassOptions()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Class Check In View');
            });
        }

        function getClass() {
            return classCheckInService.getClass().then(function (theClass) {
                vm.class = theClass;
                vm.isClassLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting class...";
                }
                logger.error(error.displayMessage);
                vm.isClassLoading = false;
            });
        }

        function getStudents() {
            return classCheckInService.getStudents().then(function (students) {
                vm.students = students;
                vm.areRegisteredStudentsLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting registered students...";
                }
                logger.error(error.displayMessage);
                vm.areRegisteredStudentsLoading = false;
            });
        }

        function getPassOptions() {
            return blockEnrolmentService.getPassOptions().then(function (passOptions) {
                vm.passOptions = passOptions;
                vm.arePassesLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.arePassesLoading = "Issue getting pass options...";
                }
                logger.error(error.displayMessage);
                vm.arePassesLoading = false;
            });
        }
    }
})();
