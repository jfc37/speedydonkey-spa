(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('todaysClasses', todaysClasses);

    /* @ngInject */
    function todaysClasses(todaysClassesService, sectionBlockService) {

        return {
            restrict: 'E',
            templateUrl: 'app/dashboard/todaysClasses/todaysClasses.html',
            controllerAs: 'vm',
            scope: true,
            controller: function () {
                var vm = this;

                sectionBlockService.block({
                    block: 'todaysClasses',
                    promise: activate()
                });

                function activate() {
                    return todaysClassesService.getClassesForCheckIn().then(function (classes) {
                        vm.todaysClasses = classes;
                    }, function () {
                        vm.errorMessage = 'Oops, we couldn\'t get today\'s classes';
                    });
                }
            }
        };
    }
})();
