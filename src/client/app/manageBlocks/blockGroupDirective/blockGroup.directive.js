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
            controller: function (blockService) {
                var vm = this;

                vm.anySelected = function () {
                    return getSelectedBlocks().length > 0;
                };

                vm.deleteSelected = function () {
                    var blocksToDelete = getSelectedBlocks();
                    blockService.deleteBlocks(blocksToDelete).then(function () {
                        unselectAll();
                        blocksToDelete.forEach(function (block) {
                            vm.blocks.remove(block);
                        });
                    });
                };

                vm.generateSelected = function () {
                    var blocksToGenerate = getSelectedBlocks();
                    blockService.generateFromBlocks(blocksToGenerate).then(function () {
                        unselectAll();
                    });
                };

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
