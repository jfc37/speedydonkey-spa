(function () {
    'use strict';

    angular
        .module('app.rooms')
        .controller('ManageRooms', ManageRooms);

    /* @ngInject */
    function ManageRooms(roomService) {
        var vm = this;
        vm.rooms = [];

        activate();

        function activate() {
            getRooms();
        }

        function getRooms() {
            roomService.getRooms().then(function (rooms) {
                vm.rooms = rooms;
            });
        }
    }
})();
