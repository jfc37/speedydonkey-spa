(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .controller('ManageStudents', ManageStudents);

    ManageStudents.$inject = ['$q', 'logger', 'manageStudentsService'];

    /* @ngInject */
    function ManageStudents($q, logger, manageStudentsService) {
        /*jshint validthis: true */
        var vm = this;
        vm.students = [];

        vm.remove = function(id) {
            manageStudentsService.deleteStudent(id).then(function (){
                var studentRemoved = vm.students.filter(function (student) {
                    return student.id === id;
                })[0];
                logger.success(studentRemoved.full_name + ' has been removed as a student');
                vm.students.remove(studentRemoved);
            }, function() {
                logger.error('Failed removing the student');
            });
        };

        vm.getStudentInfo = function(student) {
            if (student.studentInfo === undefined) {
                manageStudentsService.getStudentInfo(student.id).then(function(studentInfo){
                    student.studentInfo = studentInfo;
                });
            }
            student.show = !student.show;
        };

        vm.deletePass = function(student, pass) {
            manageStudentsService.deletePass(pass.id).then(function(){
                student.studentInfo.passes.remove(pass);
                logger.success('Pass deleted');
            }, function (){
                logger.error('Problem deleting pass');
            });
        };

        activate();

        function activate() {
            var promises = [getStudents()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Manage Students');
            });
        }

        function getStudents() {
            $q(function (resolve) {
                manageStudentsService.getStudents().then(function(students) {
                    vm.students = students;
                    resolve();
                }, function() {
                    logger.error('Failed getting students');
                });
            });
        }
    }
})();