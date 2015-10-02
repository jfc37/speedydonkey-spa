(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('ManageBlocks', ManageBlocks);

    /* @ngInject */
    function ManageBlocks(blockService) {
        var vm = this;
        vm.blocks = [];
        vm.statusCount = function (status) {
            return vm.blocks.filter(function (block) {
                return block.status === status;
            }).length;
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
