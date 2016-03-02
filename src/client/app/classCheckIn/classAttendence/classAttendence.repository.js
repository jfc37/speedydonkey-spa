(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('classAttendenceRepository', classAttendenceRepository);

    /* @ngInject */
    function classAttendenceRepository($q, simpleApiCaller) {
        var studentsAttending = [];

        var service = {
            attend: attend,
            unattend: unattend
        };

        return service;

        function attend(student, theClass) {
            return simpleApiCaller.post({}, getOptions(student, theClass));
        }

        function unattend(student, theClass) {
            return simpleApiCaller.delete(getOptions(student, theClass));
        }

        function getOptions(student, theClass) {
            return {
                resource: 'classes/' + theClass.id + '/attendance/' + student.id
            };
        }
    }
})();
