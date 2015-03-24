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
        vm.registeredStudents = [];
        vm.walkInStudents = [];
        vm.isClassLoading = true;
        vm.areRegisteredStudentsLoading = true;

        vm.searchUsers = function (name) {
            return classCheckInService.searchUsers(name);
        }

        activate();

        function activate() {
            var promises = [getClass(), getRegisteredStudents()];
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

        function getRegisteredStudents() {
            return classCheckInService.getRegisteredStudents().then(function (students) {
                vm.registeredStudents = students;
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
