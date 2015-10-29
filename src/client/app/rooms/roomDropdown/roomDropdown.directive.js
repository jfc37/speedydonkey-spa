(function () {
    'use strict';

    angular
        .module('app.rooms')
        .directive('roomDropdown', roomDropdown);

    function roomDropdown() {
        return {
            restrict: 'E',
            templateUrl: 'app/rooms/roomDropdown/roomDropdown.html',
            controllerAs: 'vm',
            bindToController: true,
            require: ['ngModel', 'entity'],
            scope: {
                ngModel: '=',
                entity: '=',
                entityType: '@'
            },
            /* @ngInject */
            controller: function (roomService, blockService, classService) {
                var vm = this;

                vm.rooms = [];

                roomService.getRooms().then(function (rooms) {
                    vm.rooms = rooms;
                });

                vm.update = function () {
                    if (vm.entityType === 'block') {
                        blockService.changeRoom(vm.entity, vm.ngModel);
                    } else {
                        classService.changeRoom(vm.entity, vm.ngModel);
                    }
                };
            }
        };
    }
})();
