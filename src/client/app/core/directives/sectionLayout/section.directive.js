/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('sectionContent', sectionContent);

    function sectionContent() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/sectionContent.html',
            transclude: true
        };
        return directive;
    }

})();
