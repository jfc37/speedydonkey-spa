(function () {
    'use strict';

    angular
        .module('app.rooms')
        .controller('Room', Room);

    /* @ngInject */
    function Room($routeParams, roomService, routehelper, validationService) {
        var vm = this;

        vm.submit = function (form) {
            roomService.update(vm.room).then(function () {
                routehelper.redirectToRoute('manageRooms');
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        activate();

        function activate() {
            getRoom();
        }

        function getRoom() {
            roomService.getRoom($routeParams.id).then(function (room) {
                vm.room = room;
            });
        }
    }
})();
