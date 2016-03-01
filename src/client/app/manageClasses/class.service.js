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
                var theClass = response.data;

                theClass.startTime = new Date(theClass.startTime);
                theClass.endTime = new Date(theClass.endTime);

                return theClass;
            });
        }

        function update(theClass) {
            var options = getOptions();
            options.id = theClass.id;

            return simpleApiCaller.put(theClass, options).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.data && response.data.validationResult) {
                    return $q.reject(response.data.validationResult);
                } else {
                    return $q.reject();
                }
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
