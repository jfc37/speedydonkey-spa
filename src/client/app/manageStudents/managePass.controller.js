(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .controller('ManagePass', ManagePass);

    ManagePass.$inject = ['$scope', '$q', 'logger', 'managePassesService', 'validationService'];

    function ManagePass($scope, $q, logger, managePassesService, validationService) {
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
                logger.error('Failed to delete pass');
            });
        };

        $scope.cancel = function () {
            $scope.pass = copy;
            $scope.passUpdating = false;
            $scope.form.$setUntouched();
        };
    }
})();
