(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('todaysEvents', todaysEvents);

    /* @ngInject */
    function todaysEvents(todaysEventsService, sectionBlockService) {

        return {
            restrict: 'E',
            templateUrl: 'app/dashboard/todaysEvents/todaysEvents.html',
            controllerAs: 'vm',
            scope: true,
            controller: function () {
                var vm = this;

                sectionBlockService.block({
                    block: 'todaysEvents',
                    promise: activate()
                });

                function activate() {
                    return todaysEventsService.getEventsForCheckIn().then(function (events) {
                        vm.todaysEvents = events;
                    }, function () {
                        vm.errorMessage = 'Oops, we couldn\'t get today\'s events';
                    });
                }
            }
        };
    }
})();
