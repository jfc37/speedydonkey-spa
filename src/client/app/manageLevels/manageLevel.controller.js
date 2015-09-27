(function () {
    'use strict';

    angular
        .module('app.manageLevels')
        .controller('ManageLevel', ManageLevel);

    /* @ngInject */
    function ManageLevel($scope, manageLevelsService, validationService, logger) {
        //$scope.vm.levels = $scope.$parent.vm.levels;
        var vm = {};
        $scope.vm.submitText = 'Update';
        $scope.vm.cancelText = 'Close';
        var copy = {};

        $scope.vm.startUpdating = function () {
            copy = angular.copy($scope.vm.level);
            $scope.vm.updating = true;
        };

        $scope.vm.submit = function (form) {
            manageLevelsService.update($scope.vm.level).then(function () {
                logger.success('Level updated');
                $scope.vm.updating = false;
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.vm.generateBlock = function () {
            manageLevelsService.generateBlock($scope.vm.level.id).then(function () {
                logger.success('Block generated');
            }, function () {
                logger.error('Problem generating block');
            });
        };

        $scope.vm.delete = function () {
            manageLevelsService.deleteLevel($scope.vm.level.id).then(function () {
                logger.success('Level deleted');
                $scope.$parent.vm.levels.remove($scope.vm.level);
            }, function (errors) {
                logger.error('Failed to delete level');
            });
        };

        $scope.vm.cancel = function () {
            $scope.vm.level = copy;
            $scope.vm.updating = false;
            $scope.form.$setUntouched();
        };
    }
})();
