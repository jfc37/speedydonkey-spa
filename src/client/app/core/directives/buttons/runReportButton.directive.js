(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('runReportButton', runReportButton);

    function runReportButton() {
        var directive = {
            templateUrl: 'app/core/directives/buttons/runReportButton.html',
            replace: true
        };
        return directive;
    }

})();
