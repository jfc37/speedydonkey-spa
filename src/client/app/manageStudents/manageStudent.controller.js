(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .controller('ManageStudent', ManageStudent);

    function ManageStudent($scope, $q, logger, manageStudentsService, validationService) {
        var vm = {};
        $scope.vm.submitText = 'Update';
        $scope.vm.cancelText = 'Close';
        var copy = {};

        $scope.vm.startUpdating = function () {
            copy = angular.copy($scope.vm.student);
            $scope.vm.updating = true;
        };

        $scope.getStudentInfo = function () {
            if ($scope.student.studentInfo === undefined) {
                manageStudentsService.getStudentInfo($scope.student.id).then(function (studentInfo) {
                    $scope.student.studentInfo = studentInfo;
                });
            }
            $scope.showStudent = !$scope.showStudent;
        };

        $scope.vm.submit = function (form) {
            manageStudentsService.update($scope.vm.student).then(function () {
                logger.success('Student updated');
                $scope.vm.updating = false;
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.delete = function () {
            manageStudentsService.deleteStudent($scope.student.id).then(function () {
                logger.success('Student deleted');
                $scope.$parent.vm.students.remove($scope.student);
            }, function (errors) {
                logger.error('Failed to delete student');
            });
        };

        $scope.vm.cancel = function () {
            $scope.vm.student = copy;
            $scope.vm.updating = false;
            $scope.form.$setUntouched();
        };
    }
})();
