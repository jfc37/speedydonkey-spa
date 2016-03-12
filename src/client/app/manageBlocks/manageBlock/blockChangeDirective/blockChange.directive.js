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
            controller: function ($route, blockService, niceAlert, pageReloader) {
                var vm = this;

                vm.cancel = function () {
                    pageReloader.reload();
                };

                vm.submit = function () {
                    blockService.update(vm.block).then(function () {
                            pageReloader.reload();
                            niceAlert.success({
                                message: 'Block was successfully updated.'
                            });
                        },
                        function (validation) {
                            if (validation) {
                                vm.serverValidation = validation;
                                niceAlert.validationWarning();
                            } else {
                                niceAlert.error({
                                    message: 'There was a problem updating the block.'
                                });
                            }

                        });
                };
            }
        };
    }
})();
