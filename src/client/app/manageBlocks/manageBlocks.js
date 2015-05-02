(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('ManageBlocks', ManageBlocks)
        .controller('ManageBlock', ManageBlock);

    ManageBlocks.$inject = ['$q', 'logger', 'manageBlocksService'];

    /* @ngInject */
    function ManageBlocks($q, logger, manageBlocksService) {
        /*jshint validthis: true */
        var vm = this;
        vm.blocks = [];

        activate();

        function activate() {
            var promises = [getBlocks()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Manage Blocks');
            });
        }

        function getBlocks() {
            manageBlocksService.getBlocks().then(function(blocks) {
                vm.blocks = blocks;
            }, function(){
                logger.error('Failed to get blocks');
            });
        }
    }

    ManageBlock.$inject = ['$scope', 'manageBlocksService', 'validationService', 'logger'];

    function ManageBlock($scope, manageBlocksService, validationService, logger) {
        var vm = {};
        $scope.vm.submitText = 'Update';
        $scope.vm.cancelText = 'Close';
        var copy = {};

        $scope.vm.startUpdating = function() {
            copy = angular.copy($scope.vm.block);
            $scope.vm.updating = true;
        };

        $scope.vm.submit = function(form) {
            manageBlocksService.update($scope.vm.block).then(function (){
                logger.success('Block updated');
                $scope.vm.updating = false;
            }, function(errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.vm.delete = function() {
            manageBlocksService.deleteBlock($scope.vm.block.id).then(function (){
                logger.success('Block deleted');
                $scope.$parent.vm.blocks.remove($scope.vm.block);
            }, function(errors) {
                logger.error("Failed to delete block");
            });
        };

        $scope.vm.cancel = function() {
            $scope.vm.block = copy;
            $scope.vm.updating = false;
            $scope.form.$setUntouched();
        };
    }
})();