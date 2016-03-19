/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('section', section);

    function section() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/section.html',
            transclude: true
        };
        return directive;
    }

})();
