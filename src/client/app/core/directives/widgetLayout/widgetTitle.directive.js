/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('widgetTitle', widgetTitle);

    function widgetTitle() {
        var directive = {
            templateUrl: 'app/core/directives/widgetLayout/widgetTitle.html',
            transclude: true,
            replace: true
        };
        return directive;
    }

})();
