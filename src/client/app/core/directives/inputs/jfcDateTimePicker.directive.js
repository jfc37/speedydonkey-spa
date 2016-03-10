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

            }
        };
        return directive;
    }

})();
