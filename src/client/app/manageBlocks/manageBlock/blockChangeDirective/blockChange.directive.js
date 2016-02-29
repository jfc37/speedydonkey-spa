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
                    blockService.update(vm.block).then(function (validation) {
                            if (!validation) {
                                niceAlert.success({
                                    message: 'Block was successfully updated.'
                                });
                                pageReloader.reload();
                            } else {
                                vm.serverValidation = validation;
                                niceAlert.validationWarning();
                            }
                        },
                        function (errors) {
                            niceAlert.error({
                                message: 'There was a problem updating the block.'
                            });
                        });
                };
            }
        };
    }
})();
