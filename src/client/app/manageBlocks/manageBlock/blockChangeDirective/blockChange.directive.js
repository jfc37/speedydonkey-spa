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
            /* @ngInject */
            controller: function ($route, blockService, validationService) {
                var vm = this;

                vm.cancel = function () {
                    $route.reload();
                };

                vm.submit = function (form) {
                    blockService.update(vm.block).then(function () {
                        $route.reload();
                    }, function (errors) {
                        validationService.applyServerSideErrors(form, errors);
                    });
                };
            }
        };
    }
})();
