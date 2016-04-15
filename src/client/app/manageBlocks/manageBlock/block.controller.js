(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('Block', Block);

    /* @ngInject */
    function Block($routeParams, blockService) {
        var vm = this;

        activate();

        function activate() {
            getBlock();
        }

        function getBlock() {
            blockService.getBlock($routeParams.id).then(function (block) {
                vm.block = block;
            });
        }
    }
})();
