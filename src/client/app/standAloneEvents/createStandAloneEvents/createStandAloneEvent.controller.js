(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .controller('CreateStandAloneEvent', CreateStandAloneEvent);

    /* @ngInject */
    function CreateStandAloneEvent(standAloneEventService, routehelper, validationService) {
        var vm = this;
        vm.standAloneEvent = {};

        vm.submit = function (form) {
            standAloneEventService.create(vm.standAloneEvent).then(function () {
                routehelper.redirectToRoute('manageStandAloneEvent');
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
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
