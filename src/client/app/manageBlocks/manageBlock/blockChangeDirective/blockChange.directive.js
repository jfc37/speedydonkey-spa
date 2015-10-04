(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .directive('blockChange', blockChange);

    /* @ngInject */
    function blockChange() {
        return {
            restrict: 'E',
            scope: {
                block: '='
            },
            templateUrl: 'app/manageBlocks/manageBlock/blockChangeDirective/blockChange.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: function (blockService, routehelper, validationService) {
                var vm = this;

                vm.submit = function (form) {
                    blockService.update(vm.block).then(function () {
                        routehelper.redirectToRoute('manageBlocks');
                    }, function (errors) {
                        validationService.applyServerSideErrors(form, errors);
                    });
                };
            }
        };
    }
})();
