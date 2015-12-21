(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .controller('StandAloneEvent', StandAloneEvent);

    /* @ngInject */
    function StandAloneEvent($routeParams, standAloneEventService, routehelper, validationService) {
        var vm = this;

        vm.submit = function (form) {
            standAloneEventService.update(vm.event).then(function () {
                routehelper.redirectToRoute('manageEvents');
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        activate();

        function activate() {
            getEvent();
        }

        function getEvent() {
            standAloneEventService.getEvent($routeParams.id).then(function (theEvent) {
                vm.event = theEvent;
            });
        }
    }
})();
