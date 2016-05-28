(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('downloadCsvButton', downloadCsvButton);

    function downloadCsvButton() {
        var directive = {
            templateUrl: 'app/core/directives/buttons/downloadCsvButton.html',
            replace: true
        };
        return directive;
    }

})();
