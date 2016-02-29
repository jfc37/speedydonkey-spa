(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .controller('ManageTeachers', ManageTeachers);

    /* @ngInject */
    function ManageTeachers(manageTeachersService, niceAlert) {
        var vm = this;
        vm.teachers = [];

        vm.confirmDelete = function () {
            niceAlert.confirm({
                message: 'All selected teachers will be deleted.'
            }, deleteSelected);
        };

        function deleteSelected() {
            var teachersToDelete = getSelectedTeachers();
            manageTeachersService.deleteTeachers(teachersToDelete).then(function () {
                niceAlert.success({
                    message: 'Selected teachers have been deleted.'
                });
                teachersToDelete.forEach(function (teacher) {
                    vm.teachers.remove(teacher);
                });
            }, function () {
                niceAlert.error({
                    message: 'Problem removing this user as a teacher'
                });
            });
        }

        function getSelectedTeachers() {
            return vm.teachers.filter(function (teacher) {
                return teacher.selected;
            });
        }

        vm.addTeacher = function () {
            manageTeachersService.addTeacher(vm.selectedUser.id).then(function (newTeacher) {
                niceAlert.success({
                    message: newTeacher.fullName + ' is now a teacher.'
                });
                vm.teachers.push(newTeacher);
            }, function (validation) {
                if (validation) {
                    niceAlert.validationWarning(validation[0].errorMessage);
                } else {
                    niceAlert.error({
                        message: 'Problem making ' + vm.selectedUser.fullName + ' a teacher'
                    });
                }
            }).finally(function () {
                vm.selectedUser = '';
            });
        };

        vm.remove = function (id) {
            manageTeachersService.deleteTeacher(id).then(function () {
                var teacherRemoved = vm.teachers.filter(function (teacher) {
                    return teacher.id === id;
                })[0];
                vm.teachers.remove(teacherRemoved);

                niceAlert.success({
                    message: teacherRemoved.fullName + ' has been removed as a teacher.'
                });
            }, function () {
                niceAlert.error({
                    message: 'Problem removing this user as a teacher'
                });
            });
        };

        activate();

        function activate() {
            return getTeachers();
        }

        function getTeachers() {
            return manageTeachersService.getTeachers().then(function (teachers) {
                teachers.forEach(function (teacher) {
                    teacher.selected = false;
                });
                vm.teachers = teachers;
            }, function () {
                niceAlert.error({
                    message: 'Problem getting teachers.'
                });
            });
        }
    }
})();
