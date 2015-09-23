(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('classService', classService);

    /* @ngInject */
    function classService($q, simpleApiCaller) {

        var service = {
            getClassesForCheckIn: getClassesForCheckIn,
            updateTeachers: updateTeachers
        };

        function getClassesForCheckIn() {
            var search = [
                {
                    field: 'starttime',
                    condition: 'gt',
                    value: moment().format('YYYY-MM-DD')
                },
                {
                    field: 'starttime',
                    condition: 'lt',
                    value: moment().add(1, 'day').format('YYYY-MM-DD')
                }
            ];

            var options = {
                resource: 'classes',
                search: search
            };

            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.status === 404) {
                    return [];
                } else {
                    return $q.reject();
                }
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

        return service;
    }
})();
