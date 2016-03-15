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
            controller: function (standAloneEventService, niceAlert) {
                var vm = this;

                vm.anySelected = function () {
                    return getSelectedEvents().length > 0;
                };

                vm.confirmDelete = function () {
                    niceAlert.confirm({
                        message: 'All selected events will be deleted.'
                    }, deleteSelected);
                };

                function deleteSelected() {
                    var eventsToDelete = getSelectedEvents();
                    standAloneEventService.deleteEvents(eventsToDelete).then(function () {
                        niceAlert.success({
                            message: 'Selected events have been deleted.'
                        });
                        eventsToDelete.forEach(function (theEvent) {
                            vm.events.remove(theEvent);
                        });
                    }, function () {
                        niceAlert.error('Problem deleting selected events.');
                    });
                }

                vm.selectAllClicked = function () {
                    setAllSelected(vm.selectAll);
                };

                function setAllSelected(isSelected) {
                    vm.events.forEach(function (theEvent) {
                        theEvent.selected = isSelected;
                    });
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
