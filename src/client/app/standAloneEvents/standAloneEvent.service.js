(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .factory('standAloneEventService', standAloneEventService);

    /* @ngInject */
    function standAloneEventService($q, simpleApiCaller) {

        var service = {
            create: create,
            getEvents: getEvents
        };

        function create(standAloneEvent) {
            return simpleApiCaller.post(standAloneEvent, getOptions()).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.validationResult) {
                    return response.validationResult.validationErrors;
                }
            });
        }

        function getEvents() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                var events = response.data;

                var today = new Date();
                events.forEach(function (theEvent) {
                    if (moment(theEvent.endDate).isBefore(today)) {
                        theEvent.status = 'Past';
                    } else if (moment(theEvent.startDate).isAfter(today)) {
                        theEvent.status = 'Future';
                    } else {
                        theEvent.status = 'Current';
                    }
                });

                return events;
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
