/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('sectionGroupSeparator', sectionGroupSeparator);

    function sectionGroupSeparator() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/sectionGroupSeparator.html',
            transclude: true
        };
        return directive;
    }

})();
