(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('selectItem', selectItem);

    function selectItem() {
        var directive = {
            templateUrl: 'app/core/directives/tables/selectItem.html',
            replace: true,
            restrict: 'A',
            scope: {
                'item': '='
            },
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {
                var vm = this;
            }
        };
        return directive;
    }

})();
