/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('sectionGroupLabel', sectionGroupLabel);

    function sectionGroupLabel() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/sectionGroupLabel.html',
            transclude: true
        };
        return directive;
    }

})();
