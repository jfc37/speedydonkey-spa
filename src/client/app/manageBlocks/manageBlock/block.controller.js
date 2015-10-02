(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('Block', Block);

    /* @ngInject */
    function Block($routeParams, blockService, routehelper, validationService) {
        var vm = this;

        vm.submit = function (form) {
            blockService.update(vm.block).then(function () {
                routehelper.redirectToRoute('manageBlocks');
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

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
