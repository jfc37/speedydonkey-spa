(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('spacesAvailable', spacesAvailable);

    function spacesAvailable() {
        var directive = {
            templateUrl: 'app/core/directives/products/spacesAvailable.html',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                number: '='
            },
            controller: function () {
                var vm = this;

                if (vm.number <= 0) {
                    vm.text = 'No spaces available';
                    vm.type = 'label-danger';
                } else {
                    vm.type = 'label-warning';
                    if (vm.number === 1) {
                        vm.text = vm.number + ' space left';
                    } else if (vm.number < 5) {
                        vm.text = vm.number + ' spaces left';
                    }
                }
            }
        };
        return directive;
    }

})();

