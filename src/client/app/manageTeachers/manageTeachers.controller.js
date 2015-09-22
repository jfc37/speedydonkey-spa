(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .controller('ManageTeachers', ManageTeachers);

    /* @ngInject */
    function ManageTeachers($q, logger, manageTeachersService) {
        /*jshint validthis: true */
        var vm = this;
        vm.teachers = [];

        vm.addTeacher = function () {
            manageTeachersService.addTeacher(vm.selectedUser.id).then(function (newTeacher) {
                logger.success(newTeacher.full_name + ' is now a teacher!');
                vm.teachers.push(newTeacher);
                vm.selectedUser = '';
            }, function () {
                logger.error('Failed adding the new teacher');
            });
        };

        vm.remove = function (id) {
            manageTeachersService.deleteTeacher(id).then(function () {
                var teacherRemoved = vm.teachers.filter(function (teacher) {
                    return teacher.id === id;
                })[0];
                logger.success(teacherRemoved.full_name + ' has been removed as a teacher');
                vm.teachers.remove(teacherRemoved);
            }, function () {
                logger.error('Failed removing the teacher');
            });
        };

        activate();

        function activate() {
            var promises = [getTeachers()];
            return $q.all(promises)
                .then(function () {
                    logger.info('Activated Manage Teachers');
                });
        }

        function getTeachers() {
            $q(function (resolve) {
                manageTeachersService.getTeachers().then(function (teachers) {
                    vm.teachers = teachers;
                    resolve();
                }, function () {
                    logger.error('Failed getting teachers');
                });
            });
        }
    }
})();
