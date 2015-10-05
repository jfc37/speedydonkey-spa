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
            controller: function ($route, classService, validationService) {
                var vm = this;

                vm.cancel = function () {
                    $route.reload();
                };

                vm.submit = function (form) {
                    classService.update(vm.class).then(function () {
                        $route.reload();
                    }, function (errors) {
                        validationService.applyServerSideErrors(form, errors);
                    });
                };
            }
        };
    }
})();
