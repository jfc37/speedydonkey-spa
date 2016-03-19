(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('selectAllHeader', selectAllHeader);

    function selectAllHeader() {
        var directive = {
            templateUrl: 'app/core/directives/tables/selectAllHeader.html',
            replace: true,
            restrict: 'A',
            scope: {
                'collection': '='
            },
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {
                var vm = this;

                vm.selectAllClicked = function () {
                    setAllSelected(vm.selectAll);
                };

                function setAllSelected(isSelected) {
                    vm.collection.forEach(function (item) {
                        item.selected = isSelected;
                    });
                }
            }
        };
        return directive;
    }

})();
