/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('sectionGroup', sectionGroup);

    function sectionGroup() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/sectionGroup.html',
            transclude: true
        };
        return directive;
    }

})();
