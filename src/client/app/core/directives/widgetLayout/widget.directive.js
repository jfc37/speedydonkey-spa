/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('widget', widget);

    function widget() {
        var directive = {
            templateUrl: 'app/core/directives/widgetLayout/widget.html',
            transclude: true,
            replace: true
        };
        return directive;
    }

})();
