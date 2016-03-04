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

        //        vm.deletePass = function (student, pass) {
        //            manageStudentsService.deletePass(pass.id).then(function () {
        //                student.studentInfo.passes.remove(pass);
        //                logger.success('Pass deleted');
        //            }, function () {
        //                logger.error('Problem deleting pass');
        //            });
        //        };

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
