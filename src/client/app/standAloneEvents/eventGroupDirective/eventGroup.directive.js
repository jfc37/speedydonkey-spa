(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .directive('eventGroup', eventGroup);

    /* @ngInject */
    function eventGroup() {
        return {
            restrict: 'E',
            require: ['events'],
            scope: {
                events: '=',
                status: '@'
            },
            templateUrl: 'app/standAloneEvents/eventGroupDirective/eventGroup.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: function (standAloneEventService) {
                var vm = this;

                vm.anySelected = function () {
                    return getSelectedEvents().length > 0;
                };

                vm.deleteSelected = function () {
                    var eventsToDelete = getSelectedEvents();
                    standAloneEventService.deleteEvents(eventsToDelete).then(function () {
                        unselectAll();
                        eventsToDelete.forEach(function (theEvent) {
                            vm.events.remove(theEvent);
                        });
                    });
                };

                vm.selectAllClicked = function () {
                    setAllSelected(vm.selectAll);
                };

                function setAllSelected(isSelected) {
                    vm.events.forEach(function (theEvent) {
                        theEvent.selected = isSelected;
                    });
                }

                function unselectAll() {
                    vm.selectAll = false;
                    setAllSelected(false);
                }

                function getSelectedEvents() {
                    return vm.events.filter(function (theEvent) {
                        return theEvent.selected;
                    });
                }
            }
        };
    }
})();
