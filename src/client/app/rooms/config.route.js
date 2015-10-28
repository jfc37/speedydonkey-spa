(function () {
    'use strict';

    angular
        .module('app.rooms')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [{
                url: '/admin/manage/rooms',
                config: {
                    title: 'manageRooms',
                    controller: 'ManageRooms',
                    controllerAs: 'vm',
                    templateUrl: 'app/rooms/manageRooms/manageRooms.html',
                    displayName: 'Rooms',
                    settings: {
                        nav: 2,
                        level: 2,
                        parent: 'admin dashboard'
                    },
                    claim: 'Admin'
                }
            }, {
                url: '/admin/manage/rooms/create',
                config: {
                    title: 'createRoom',
                    controller: 'CreateRoom',
                    controllerAs: 'vm',
                    templateUrl: 'app/rooms/createRoom/createRoom.html',
                    claim: 'Admin'
                }
            }, {
                url: '/admin/manage/rooms/:id',
                config: {
                    title: 'room',
                    controller: 'Room',
                    controllerAs: 'vm',
                    templateUrl: 'app/rooms/manageRoom/room.html',
                    claim: 'Admin'
                }
            }, {
                url: '/admin/manage/rooms/:id/update',
                config: {
                    title: 'updateRoom',
                    controller: 'UpdateRoom',
                    controllerAs: 'vm',
                    templateUrl: 'app/rooms/updateRoom/updateRoom.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();
