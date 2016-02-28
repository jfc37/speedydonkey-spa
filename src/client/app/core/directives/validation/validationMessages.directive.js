(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('validationMessages', validationMessages);

    function validationMessages() {
        var directive = {
            templateUrl: 'app/core/directives/validation/validationMessages.html',
            replace: true,
            require: '^form',
            scope: {
                'inputName': '@'
            },
link: function (scope, elem, attrs, ctrl) {
    scope.form = ctrl;
},
            transclude: true
        };
        return directive;
    }

})();
