(function () {
    'use strict';

    angular
        .module('app.rooms')
        .controller('Room', Room);

    /* @ngInject */
    function Room($routeParams, roomRepository) {
        var vm = this;

        activate();

        function activate() {
            getRoom();
        }

        function getRoom() {
            roomRepository.get($routeParams.id).then(function (room) {
                vm.room = room;
            });
        }
    }
})();
