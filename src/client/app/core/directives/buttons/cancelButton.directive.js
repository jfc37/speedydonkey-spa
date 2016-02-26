/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('cancelButton', cancelButton);

    function cancelButton() {
        var directive = {
            templateUrl: 'app/core/directives/buttons/cancelButton.html',
            transclude: true,
            replace: true
        };
        return directive;
    }

})();
