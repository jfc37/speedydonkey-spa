(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .controller('ManageStudents', ManageStudents);

    /* @ngInject */
    function ManageStudents(userRepository, manageStudentModal, niceAlert) {
        var vm = this;
        vm.students = [];
        vm.filter = {};

        vm.launchStudent = function (student) {
            manageStudentModal.open(student);
        };

        activate();

        function activate() {
            getStudents();
        }

        function getStudents() {
            return userRepository.getAll().then(function (students) {
                vm.students = students;
            }, function () {
                niceAlert.error('Problem getting students.');
            });
        }
    }
})();
