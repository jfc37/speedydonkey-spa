(function () {
    'use strict';

    angular
        .module('app.rooms')
        .controller('CreateRoom', CreateRoom);

    /* @ngInject */
    function CreateRoom(roomService, routehelper, validationService) {
        var vm = this;
        vm.room = {};

        vm.submit = function (form) {
            roomService.create(vm.room).then(function () {
                routehelper.redirectToRoute('manageRooms');
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };
    }
})();
