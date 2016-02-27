(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('ManageBlocks', ManageBlocks);

    /* @ngInject */
    function ManageBlocks(blockService) {
        var vm = this;

        vm.futureBlocks = [];
        vm.pastBlocks = [];
        vm.currentBlocks = [];

        activate();

        function activate() {
            getBlocks();
        }

        function getBlocks() {
            blockService.getBlocks().then(function (blocks) {
                vm.futureBlocks = getBlocksOfStatus(blocks, 'Future');
                vm.pastBlocks = getBlocksOfStatus(blocks, 'Past');
                vm.currentBlocks = getBlocksOfStatus(blocks, 'Current');
            });
        }

        function getBlocksOfStatus(blocks, status) {
            return blocks.filter(function (block) {
                return block.status === status;
            });
        }
    }
})();
