(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('jfcDateTimePicker', jfcDateTimePicker);

    function jfcDateTimePicker() {
        var directive = {
            templateUrl: 'app/core/directives/inputs/jfcDateTimePicker.html',
            replace: true,
            scope: {
                ngModel: '=',
                name: '@'
            },
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {
                var vm = this;

                vm.enableTime = true;
                vm.displayFormat = 'dd/MM/yyyy HH:mm';
            }
        };
        return directive;
    }

})();

(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('jfcDatePicker', jfcDatePicker);

    function jfcDatePicker() {
        var directive = {
            templateUrl: 'app/core/directives/inputs/jfcDateTimePicker.html',
            replace: true,
            scope: {
                ngModel: '=',
                name: '@'
            },
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {
                var vm = this;

                vm.enableTime = false;
                vm.displayFormat = 'dd/MM/yyyy';
            }
        };
        return directive;
    }

})();
