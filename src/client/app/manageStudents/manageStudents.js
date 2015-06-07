(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .controller('ManageStudents', ManageStudents)
        .controller('ManageStudent', ManageStudent)
        .controller('ManagePass', ManagePass);

    ManageStudents.$inject = ['$q', 'logger', 'manageStudentsService'];

    /* @ngInject */
    function ManageStudents($q, logger, manageStudentsService) {
        /*jshint validthis: true */
        var vm = this;
        vm.students = [];
        vm.filter = {};

        vm.deletePass = function (student, pass) {
            manageStudentsService.deletePass(pass.id).then(function () {
                student.studentInfo.passes.remove(pass);
                logger.success('Pass deleted');
            }, function () {
                logger.error('Problem deleting pass');
            });
        };

        activate();

        function activate() {
            var promises = [getStudents()];
            return $q.all(promises)
                .then(function () {
                    logger.info('Activated Manage Students');
                });
        }

        function getStudents() {
            $q(function (resolve) {
                manageStudentsService.getStudents().then(function (students) {
                    vm.students = students;
                    resolve();
                }, function () {
                    logger.error('Failed getting students');
                });
            });
        }
    }

    ManageStudent.$inject = ['$scope', '$q', 'logger', 'manageStudentsService'];

    function ManageStudent($scope, $q, logger, manageStudentsService) {
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
                logger.error("Failed to delete student");
            });
        };

        $scope.vm.cancel = function () {
            $scope.vm.student = copy;
            $scope.vm.updating = false;
            $scope.form.$setUntouched();
        };
    }

    ManagePass.$inject = ['$scope', '$q', 'logger', 'managePassesService'];

    function ManagePass($scope, $q, logger, managePassesService) {
        var vm = {};
        $scope.vm.submitText = 'Update';
        $scope.vm.cancelText = 'Close';
        var copy = {};
        $scope.startUpdating = function () {
            copy = angular.copy($scope.pass);
            $scope.passUpdating = true;
        };

        $scope.submit = function (form) {
            managePassesService.updatePass($scope.pass).then(function () {
                logger.success('Pass updated');
                $scope.passUpdating = false;
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.delete = function () {
            managePassesService.deletePass($scope.pass.id).then(function () {
                logger.success('Pass deleted');
                $scope.$parent.student.studentInfo.passes.remove($scope.pass);
            }, function (errors) {
                logger.error("Failed to delete pass");
            });
        };

        $scope.cancel = function () {
            $scope.pass = copy;
            $scope.passUpdating = false;
            $scope.form.$setUntouched();
        };
    }
})();
