(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .directive('blockSummary', blockSummary);

    /* @ngInject */
    function blockSummary() {
        return {
            restrict: 'E',
            scope: {
                'block': '='
            },
            templateUrl: 'app/manageBlocks/manageBlock/blockSummaryDirective/blockSummary.html',
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {

            }
        };
    }
})();
