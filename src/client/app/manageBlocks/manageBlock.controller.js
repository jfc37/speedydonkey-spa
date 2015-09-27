(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('ManageBlock', ManageBlock);

    /* @ngInject */
    function ManageBlock($scope, manageBlocksService, validationService, logger, blockUI) {
        var vm = {};
        $scope.vm.submitText = 'Update';
        $scope.vm.cancelText = 'Close';
        var copy = {};

        $scope.vm.startUpdating = function () {
            copy = angular.copy($scope.vm.block);
            $scope.vm.updating = true;
        };

        $scope.vm.submit = function (form) {
            blockUI.start();
            manageBlocksService.update($scope.vm.block).then(function () {
                blockUI.stop();
                logger.success('Block updated');
                $scope.vm.updating = false;
            }, function (errors) {
                blockUI.stop();
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.vm.delete = function () {
            manageBlocksService.deleteBlock($scope.vm.block.id).then(function () {
                logger.success('Block deleted');
                $scope.$parent.vm.blocks.remove($scope.vm.block);
            }, function (errors) {
                logger.error('Failed to delete block');
            });
        };

        $scope.vm.cancel = function () {
            $scope.vm.block = copy;
            $scope.vm.updating = false;
            $scope.form.$setUntouched();
        };
    }
})();
