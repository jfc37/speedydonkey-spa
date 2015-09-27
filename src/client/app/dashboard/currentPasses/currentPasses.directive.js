(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('currentPasses', currentPasses);

    /* @ngInject */
    function currentPasses(passService, sectionBlockService) {

        return {
            restrict: 'E',
            templateUrl: 'app/dashboard/currentPasses/currentPasses.html',
            controllerAs: 'vm',
            scope: true,
            controller: function () {
                var vm = this;

                sectionBlockService.block({
                    block: 'currentPasses',
                    promise: activate()
                });

                function activate() {
                    return passService.getCurrentUsersPasses().then(function (passes) {
                        vm.currentPasses = passes;
                    }, function () {
                        vm.errorMessage = 'Oops, we couldn\'t get your current passes';
                    });
                }
            }
        };
    }
})();
