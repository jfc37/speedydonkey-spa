(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .directive('classSummary', classSummary);

    /* @ngInject */
    function classSummary() {
        return {
            restrict: 'E',
            scope: {
                'class': '='
            },
            templateUrl: 'app/manageClasses/classSummaryDirective/classSummary.html',
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {

            }
        };
    }
})();
