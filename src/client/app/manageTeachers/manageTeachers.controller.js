(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .controller('ManageTeachers', ManageTeachers);

    /* @ngInject */
    function ManageTeachers(teacherRepository, teacherRateRepository, editRateModal, niceAlert) {
        var vm = this;
        vm.teachers = [];

        vm.confirmDelete = function () {
            niceAlert.confirm({
                message: 'All selected teachers will be deleted.'
            }, deleteSelected);
        };

        function deleteSelected() {
            var teachersToDelete = getSelectedTeachers();
            teacherRepository.delete(teachersToDelete).then(function () {
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
            teacherRepository.create(vm.selectedUser.id).then(function (newTeacher) {

                teacherRateRepository.get(newTeacher.id).then(function (newTeacherRate) {
                    vm.teachers.push(newTeacherRate);
                });

                niceAlert.success({
                    message: newTeacher.fullName + ' is now a teacher.'
                });

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

        vm.launchRateChange = function(teacher) {
            editRateModal.open(teacher);
        };

        activate();

        function activate() {
            return getTeachers();
        }

        function getTeachers() {
            return teacherRateRepository.getAll().then(function (teachers) {
                teachers.forEach(function (teacher) {
                    teacher.selected = false;
                });
                vm.teachers = teachers;
            }, function (response) {
                if (response.status !== 404) {
                    niceAlert.error({
                        message: 'Problem getting teachers.'
                    });
                }
            });
        }
    }
})();
