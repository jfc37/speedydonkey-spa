(function () {
    'use strict';

    angular
        .module('app.rooms')
        .directive('roomSummary', roomSummary);

    /* @ngInject */
    function roomSummary() {
        return {
            restrict: 'E',
            scope: {
                'room': '='
            },
            templateUrl: 'app/rooms/manageRoom/roomSummaryDirective/roomSummary.html',
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {

            }
        };
    }
})();
