(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .directive('classChange', classChange);

    /* @ngInject */
    function classChange() {
        return {
            restrict: 'E',
            scope: {
                class: '='
            },
            templateUrl: 'app/manageClasses/classChangeDirective/classChange.html',
            controllerAs: 'vm',
            bindToController: true,
            /* @ngInject */
            controller: function ($route, classService, pageReloader, niceAlert) {
                var vm = this;

                vm.cancel = function () {
                    $route.reload();
                };

                vm.submit = function (form) {
                    classService.update(vm.class).then(function () {
                        niceAlert.success({
                            message: 'Block was successfully updated.'
                        });
                        pageReloader.reload();
                    }, function (validation) {
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
