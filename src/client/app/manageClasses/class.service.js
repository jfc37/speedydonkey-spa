(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .factory('classService', classService);

    /* @ngInject */
    function classService($q, dataservice, dataUpdateService, dataCreateService, dataDeleteService, simpleApiCaller) {

        var service = {
            changeRoom: changeRoom,
            getClass: getClass,
            update: update,
            deleteClass: deleteClass,
            filterClasses: filterClasses,
            updateTeachers: updateTeachers
        };

        function changeRoom(theClass, room) {
            var options = getOptions();
            var request;

            if (!room) {
                options.resource = options.resource + '/' + theClass.id + '/rooms';
                request = simpleApiCaller.delete(options);
            } else {
                options.resource = options.resource + '/' + theClass.id + '/rooms/' + room.id;
                request = simpleApiCaller.put({}, options);
            }

            return request.then(function (response) {
                return response.data;
            }, function (response) {
                if (response.validationResult) {
                    return response.validationResult.validationErrors;
                }
            });
        }

        function getClass(id) {
            var options = getOptions();
            options.id = id;

            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            });
        }

        function update(theClass) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateClass(theClass).then(function (updatedClass) {
                    resolve(updatedClass);
                }, function (response) {
                    if (response.validationResult !== undefined) {
                        revoke(response.validationResult.validationErrors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function deleteClass(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteClass(id).then(resolve, revoke);
            });
        }

        function filterClasses(filter) {
            return $q(function (resolve, revoke) {
                dataservice.searchForClasses(filter).then(function (response) {
                    response.data.forEach(function (theClass) {
                        theClass.block = undefined;
                    });
                    resolve(response.data);
                }, function (response) {
                    if (response.status === 404) {
                        resolve([]);
                    }
                    revoke(response);
                });
            });
        }

        function updateTeachers(theClass) {
            var options = {
                resource: 'classes/' + theClass.id + '/teachers'
            };

            var updatedTeacherIds = theClass.teachers.map(function (teacher) {
                return teacher.id;
            });

            return simpleApiCaller.put(updatedTeacherIds, options);
        }

        function getOptions() {
            return {
                resource: 'classes',
                block: true
            };
        }

        return service;

    }
})();
