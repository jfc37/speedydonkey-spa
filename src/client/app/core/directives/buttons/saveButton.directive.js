/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('saveButton', saveButton);

    function saveButton() {
        var directive = {
            templateUrl: 'app/core/directives/buttons/saveButton.html',
            transclude: true,
            replace: true
        };
        return directive;
    }

})();
