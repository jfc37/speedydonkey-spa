(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .factory('eventRegistration', eventRegistration);

    /* @ngInject */
    function eventRegistration(simpleApiCaller, authService) {

        var service = {
            getEventsForRegsitration: getEventsForRegsitration,
            register: register
        };

        function getEventsForRegsitration() {
            var options = getOptions();
            options.resource += '/for-registration';

            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            });
        }

        function register(events) {
            var enrolment = {
                userId: authService.userId(),
                eventIds: events.map(function (theEvent) {
                    return theEvent.id;
                })
            };

            return simpleApiCaller.post(enrolment, {
                resource: 'users/' + enrolment.userId + '/registration/event',
                block: true
            });
        }

        function getOptions() {
            return {
                resource: 'stand-alone-events',
                block: true
            };
        }

        return service;

    }
})();
