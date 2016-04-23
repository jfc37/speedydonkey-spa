(function () {
    'use strict';

    angular
        .module('app.rooms')
        .controller('CreateRoom', CreateRoom);

    /* @ngInject */
    function CreateRoom(roomRepository, routehelper, niceAlert) {
        var vm = this;
        vm.room = {};

        vm.submit = function () {
            roomRepository.create(vm.room).then(function () {
                niceAlert.success({
                    message: 'Room was successfully created.'
                });
                routehelper.redirectToRoute('manageRooms');
            }, function (validation) {
                if (validation) {
                    vm.serverValidation = validation;
                    niceAlert.validationWarning();
                } else {
                    niceAlert.error({
                        message: 'There was a problem creating the room.'
                    });
                }
            });
        };
    }
})();
