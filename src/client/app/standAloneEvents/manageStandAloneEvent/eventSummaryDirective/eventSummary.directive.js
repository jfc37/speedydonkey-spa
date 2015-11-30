(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .directive('eventSummary', eventSummary);

    /* @ngInject */
    function eventSummary() {
        return {
            restrict: 'E',
            scope: {
                'event': '='
            },
            templateUrl: 'app/standAloneEvents/manageStandAloneEvent/eventSummaryDirective/eventSummary.html',
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {

            }
        };
    }
})();
