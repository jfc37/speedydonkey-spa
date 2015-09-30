(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('ManageBlocks', ManageBlocks);

    /* @ngInject */
    function ManageBlocks(blockService) {
        var vm = this;
        vm.blocks = [];
        vm.delete = function (block) {
            blockService.deleteBlock(block).then(function () {
                vm.blocks.remove(block);
            });
        };

        activate();

        function activate() {
            getBlocks();
        }

        function getBlocks() {
            blockService.getBlocks().then(function (blocks) {
                vm.blocks = blocks;
            });
        }
    }
})();
