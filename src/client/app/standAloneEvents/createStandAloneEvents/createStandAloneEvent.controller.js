(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .controller('CreateStandAloneEvent', CreateStandAloneEvent);

    /* @ngInject */
    function CreateStandAloneEvent(standAloneEventService, routehelper, niceAlert) {
        var vm = this;
        vm.standAloneEvent = {};

        vm.submit = function () {
            standAloneEventService.create(vm.standAloneEvent).then(function () {
                niceAlert.success({
                    message: 'Event was successfully created.'
                });
                routehelper.redirectToRoute('manageStandAloneEvents');
            }, function (validation) {
                if (validation) {
                    vm.serverValidation = validation;
                    niceAlert.validationWarning();
                } else {
                    niceAlert.error({
                        message: 'There was a problem creating the event.'
                    });
                }
            });
        };

        activate();

        function activate() {
            getEvent();
        }

        function getEvent() {
            vm.standAloneEvent = {
                startTime: moment().startOf('day').hour(18).minute(0).toDate(),
                endTime: moment().startOf('day').hour(19).minute(0).toDate()
            };
        }
    }
})();
