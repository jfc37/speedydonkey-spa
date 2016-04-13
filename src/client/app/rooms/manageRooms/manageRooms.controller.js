(function () {
    'use strict';

    angular
        .module('app.rooms')
        .controller('ManageRooms', ManageRooms);

    /* @ngInject */
    function ManageRooms(roomRepository, niceAlert) {
        var vm = this;
        vm.rooms = [];

        vm.confirmDelete = function () {
            niceAlert.confirm({
                message: 'All selected rooms will be deleted.'
            }, deleteSelected);
        };

        function deleteSelected() {
            var toDelete = getSelected();
            roomRepository.delete(toDelete).then(function () {
                niceAlert.success({
                    message: 'Selected rooms have been deleted.'
                });
                toDelete.forEach(function (room) {
                    vm.rooms.remove(room);
                });
            }, function () {
                niceAlert.error({
                    message: 'Problem deleting rooms.'
                });
            });
        }

        function getSelected() {
            return vm.rooms.filter(function (room) {
                return room.selected;
            });
        }

        activate();

        function activate() {
            return getRooms();
        }

        function getRooms() {
            roomRepository.getAll().then(function (rooms) {
                vm.rooms = rooms;
            }, function () {
                niceAlert.error({
                    message: 'Problem getting rooms.'
                });
            });
        }
    }
})();
