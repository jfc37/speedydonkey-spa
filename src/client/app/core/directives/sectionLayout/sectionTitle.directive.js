/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('sectionTitle', sectionTitle);

    function sectionTitle() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/sectionTitle.html',
            transclude: true
        };
        return directive;
    }

})();
