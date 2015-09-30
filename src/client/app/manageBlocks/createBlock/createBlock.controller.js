(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('CreateBlock', CreateBlock);

    /* @ngInject */
    function CreateBlock(blockService, routehelper, validationService) {
        var vm = this;

        vm.submit = function (form) {
            blockService.create(vm.block).then(function () {
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
            vm.block = {
                startDate: new Date()
            };
        }
    }
})();
