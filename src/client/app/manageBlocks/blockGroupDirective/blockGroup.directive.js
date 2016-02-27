(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .directive('blockGroup', blockGroup);

    /* @ngInject */
    function blockGroup() {
        return {
            restrict: 'E',
            require: ['blocks'],
            scope: {
                blocks: '=',
                status: '@'
            },
            templateUrl: 'app/manageBlocks/blockGroupDirective/blockGroup.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: function (blockService, niceAlert, pageReloader) {
                var vm = this;

                vm.anySelected = function () {
                    return getSelectedBlocks().length > 0;
                };

                vm.confirmDelete = function () {
                    niceAlert.confirm({
                        message: 'All selected blocks will be deleted.'
                    }, deleteSelected);
                };

                function deleteSelected() {
                    var blocksToDelete = getSelectedBlocks();
                    blockService.deleteBlocks(blocksToDelete).then(function () {
                        niceAlert.success({
                            message: 'Selected blocks have been deleted.'
                        });
                        unselectAll();
                        blocksToDelete.forEach(function (block) {
                            vm.blocks.remove(block);
                        });
                    });
                }

                vm.confirmGenerate = function () {
                    niceAlert.confirm({
                        message: 'Next set of selected blocks will be generated.'
                    }, generateSelected);
                };

                function generateSelected() {
                    var blocksToGenerate = getSelectedBlocks();
                    blockService.generateFromBlocks(blocksToGenerate).then(function () {

                        niceAlert.success({
                            message: 'Selected blocks have been generated.'
                        });

                        pageReloader.reload();
                    });
                }

                vm.selectAllClicked = function () {
                    setAllSelected(vm.selectAll);
                };

                function setAllSelected(isSelected) {
                    vm.blocks.forEach(function (block) {
                        block.selected = isSelected;
                    });
                }

                function unselectAll() {
                    vm.selectAll = false;
                    setAllSelected(false);
                }

                function getSelectedBlocks() {
                    return vm.blocks.filter(function (block) {
                        return block.selected;
                    });
                }
            }
        };
    }
})();
