(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .controller('ClassCheckIn', ClassCheckIn);

    ClassCheckIn.$inject = ['$q', 'classCheckInService', 'logger'];

    /* @ngInject */
    function ClassCheckIn($q, classCheckInService, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.class = null;
        vm.students = [];
        vm.isClassLoading = true;
        vm.areRegisteredStudentsLoading = true;

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
            classCheckInService.attendenceStatusChanged(vm.walkInStudentSelected).then(function(message) {
                logger.success(message);
            }, function(message) {
                logger.error(message);
            });
            vm.students.push(vm.walkInStudentSelected);
            vm.walkInStudentSelected = '';
        };

        vm.enrolWalkIn = function () {
            classCheckInService.enrolStudent(vm.walkInStudentSelected.id, vm.class.block.id).then(function() {
                logger.success('Enroled ' + vm.walkInStudentSelected.full_name + ' in the block');
            }, function(message) {
                logger.error('Problem enroling ' + vm.walkInStudentSelected.full_name + ' in the block...');
            }).then(vm.addWalkIn);
        };

        activate();

        function activate() {
            var promises = [getClass(), getStudents()];
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
    }
})();
