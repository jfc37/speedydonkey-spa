(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .factory('eventCheckInService', eventCheckInService);

    /*@ngInject*/
    function eventCheckInService($q, $routeParams, simpleApiCaller) {
        var service = {
            attendenceStatusChanged: attendenceStatusChanged
        };

        function attendenceStatusChanged(student) {
            var message, promise;

            var options = getOptions($routeParams.id, student.id);

            if (student.isPresent) {
                message = {
                    success: 'Recorded student\'s attendance ',
                    error: 'Issue recording student\'s attendance...'
                };
                promise = simpleApiCaller.post(null, options);
            } else {
                message = {
                    success: 'Removed student\'s attendance ',
                    error: 'Issue removing student\'s attendance...'
                };
                promise = simpleApiCaller.delete(options);
            }

            return promise.then(function () {
                return message.success;
            }, function () {
                student.isPresent = !student.isPresent;
                return $q.reject(message.error);
            });
        }

        function getOptions(eventId, studentId) {
            return {
                resource: 'stand-alone-events/' + eventId + '/attendance/' + studentId
            };
        }

        return service;
    }
}());
