(function () {
    'use strict';

    angular
        .module('app.rooms')
        .factory('roomService', roomService);

    /* @ngInject */
    function roomService($q, simpleApiCaller) {

        var service = {
            getRooms: getRooms,

            update: update,
            create: create,
            getRoom: getRoom,
            getSchedule: getSchedule,
            deleteRoom: deleteRoom
        };

        function getRooms() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                var rooms = response.data;
                return rooms;
            });
        }

        function getSchedule(room) {
            var options = getOptions();
            options.resource = options.resource + '/' + room.id + '/upcoming-schedule';

            return simpleApiCaller.get(options).then(function (response) {
                var rooms = response.data;
                return rooms;
            });
        }

        function update(room) {
            var options = getOptions();
            options.id = room.id;

            return simpleApiCaller.put(room, options).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.validationResult) {
                    return response.validationResult.validationErrors;
                }
            });
        }

        function create(room) {
            return simpleApiCaller.post(room, getOptions()).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.validationResult) {
                    return response.validationResult.validationErrors;
                }
            });
        }

        function getRoom(id) {
            var options = getOptions();
            options.id = id;

            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            });
        }

        function deleteRoom(room) {
            var options = getOptions();
            options.id = room.id;

            return simpleApiCaller.delete(options);
        }

        function getOptions() {
            return {
                resource: 'rooms',
                block: true
            };
        }

        return service;

    }
})();
