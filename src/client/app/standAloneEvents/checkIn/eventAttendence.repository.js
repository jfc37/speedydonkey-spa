(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .factory('eventAttendenceRepository', eventAttendenceRepository);

    /* @ngInject */
    function eventAttendenceRepository(simpleApiCaller) {
        var studentsAttending = [];

        var service = {
            attend: attend,
            unattend: unattend
        };

        return service;

        function attend(student, theEvent) {
            return simpleApiCaller.post({}, getOptions(student, theEvent));
        }

        function unattend(student, theEvent) {
            return simpleApiCaller.delete(getOptions(student, theEvent));
        }

        function getOptions(student, theEvent) {
            return {
                resource: 'stand-alone-events/' + theEvent.id + '/attendance/' + student.id,
                block: true
            };
        }
    }
})();
