(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('roomRepository', roomRepository);

    /* @ngInject */
    function roomRepository($q, simpleApiCaller, validationPromise) {

        var service = {
            create: create,
//            update: update,
            delete: deleteRooms,
            getAll: getAll,
//            get: get
        };

        function create(room) {
            return simpleApiCaller.post(room, getOptions()).then(function () {

            }, function (response) {
                return validationPromise.reject(response);
            });
        }

//        function update(passOption) {
//            return simpleApiCaller.put(passOption, getOptions(passOption.id)).then(function () {
//
//            }, function (response) {
//                return validationPromise.reject(response);
//            });
//        }
//
        function deleteRooms(rooms) {
            var allRequests = [];

            rooms.forEach(function (room) {
                allRequests.push(deleteRoom(room.id));
            });

            return $q.all(allRequests);
        }

        function deleteRoom(id) {
            return simpleApiCaller.delete(getOptions(id));
        }

        function getAll() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.status === 404) {
                    return [];
                }
            });
        }
//
//        function get(id) {
//            return simpleApiCaller.get(getOptions(id)).then(function (response) {
//                return response.data;
//            });
//        }

        function getOptions(id) {
            var options = {
                resource: 'rooms'
            };

            if (id) {
                options.id = id;
            }

            return options;
        }

        return service;

    }
})();
