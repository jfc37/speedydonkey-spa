(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .directive('eventChange', eventChange);

    /* @ngInject */
    function eventChange() {
        return {
            restrict: 'E',
            scope: {
                event: '='
            },
            templateUrl: 'app/standAloneEvents/manageStandAloneEvent/eventChangeDirective/eventChange.html',
            controllerAs: 'vm',
            bindToController: true,
            /* @ngInject */
            controller: function ($route, standAloneEventService, validationService) {
                var vm = this;

                vm.cancel = function () {
                    $route.reload();
                };

                vm.submit = function (form) {
                    standAloneEventService.update(vm.event).then(function () {
                        $route.reload();
                    }, function (errors) {
                        validationService.applyServerSideErrors(form, errors);
                    });
                };
            }
        };
    }
})();
