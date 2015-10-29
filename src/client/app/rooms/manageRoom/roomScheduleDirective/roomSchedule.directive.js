(function () {
    'use strict';

    angular
        .module('app.rooms')
        .directive('roomSchedule', roomSchedule);

    /* @ngInject */
    function roomSchedule() {
        return {
            restrict: 'E',
            scope: {
                'room': '='
            },
            templateUrl: 'app/rooms/manageRoom/roomScheduleDirective/roomSchedule.html',
            bindToController: true,
            controllerAs: 'vm',
            controller: function ($scope, roomService) {
                var vm = this;

                roomService.getSchedule(vm.room).then(function (classes) {
                    vm.classes = classes;
                });
            }
        };
    }
})();
