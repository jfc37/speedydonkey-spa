/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('sectionGroupContent', sectionGroupContent);

    function sectionGroupContent() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/sectionGroupContent.html',
            transclude: true
        };
        return directive;
    }

})();
