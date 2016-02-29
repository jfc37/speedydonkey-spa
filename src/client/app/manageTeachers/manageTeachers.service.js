(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .factory('manageTeachersService', manageTeachersService);

    /* @ngInject */
    function manageTeachersService($q, dataDeleteService, simpleApiCaller) {

        var service = {
            addTeacher: addTeacher,
            deleteTeacher: deleteTeacher,
            deleteTeachers: deleteTeachers,
            getTeachers: getTeachers
        };

        function addTeacher(id) {
            var options = getOptions();
            options.id = id;

            return simpleApiCaller.post({}, options).then(function (response) {
                return response.data.actionResult;
            }, function (response) {
                if (response.data && response.data.validationResult) {
                    return $q.reject(response.data.validationResult.validationErrors);
                }
            });
        }

        function deleteTeachers(teachers) {
            var allRequests = [];

            teachers.forEach(function (teacher) {
                allRequests.push(deleteTeacher(teacher.id));
            });

            return $q.all(allRequests);
        }

        function deleteTeacher(id) {
            var options = getOptions();
            options.id = id;
            options.block = true;
            return simpleApiCaller.delete(options);
        }

        function getTeachers() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                return response.data;
            });
        }

        function getOptions() {
            return {
                resource: 'teachers'
            };
        }

        return service;

    }
})();
