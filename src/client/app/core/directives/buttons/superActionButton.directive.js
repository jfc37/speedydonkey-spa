/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('superActionButton', superActionButton);

    function superActionButton() {
        var directive = {
            templateUrl: 'app/core/directives/buttons/superActionButton.html',
            transclude: true,
            replace: true
        };
        return directive;
    }

})();
