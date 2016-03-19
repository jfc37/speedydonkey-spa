(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('noItemsRow', noItemsRow);

    function noItemsRow() {
        var directive = {
            templateUrl: 'app/core/directives/tables/noItemsRow.html',
            replace: true,
            scope: {
                'items': '='
            },
            restrict: 'A',
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {
                var vm = this;
            }
        };
        return directive;
    }

})();
