/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('helpText', helpText);

    function helpText() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/helpText.html',
            transclude: true
        };
        return directive;
    }

})();
