/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('flexBox', flexBox);

    function flexBox() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/flexBox.html',
            transclude: true
        };
        return directive;
    }

})();
