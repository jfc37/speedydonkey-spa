(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('actionButton', actionButton);

    function actionButton() {
        var directive = {
            templateUrl: 'app/core/directives/buttons/actionButton.html',
            transclude: true,
            replace: true
        };
        return directive;
    }

})();
