(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('classAttendenceRepository', classAttendenceRepository);

    /* @ngInject */
    function classAttendenceRepository(simpleApiCaller) {
        var studentsAttending = [];

        var service = {
            attend: attend,
            unattend: unattend,
            unenrol: unenrol
        };

        return service;

        function attend(student, theClass) {
            return simpleApiCaller.post({}, getOptions(student, theClass));
        }

        function unattend(student, theClass) {
            return simpleApiCaller.delete(getOptions(student, theClass));
        }

        function unenrol(student, blockId) {
            return simpleApiCaller.delete({
                resource: 'users/' + student.id + '/enrolment/' + blockId,
                block: true
            });
        }

        function getOptions(student, theClass) {
            return {
                resource: 'classes/' + theClass.id + '/attendance/' + student.id,
                block: true
            };
        }
    }
})();
