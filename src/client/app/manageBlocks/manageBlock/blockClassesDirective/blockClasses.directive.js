(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .directive('blockClasses', blockClasses);

    /* @ngInject */
    function blockClasses() {
        return {
            restrict: 'E',
            scope: {
                'block': '='
            },
            templateUrl: 'app/manageBlocks/manageBlock/blockClassesDirective/blockClasses.html',
            bindToController: true,
            controllerAs: 'vm',
            controller: function ($scope, blockService) {
                var vm = this;

                blockService.getBlockClasses(vm.block).then(function (classes) {
                    vm.classes = classes;
                });
            }
        };
    }
})();
