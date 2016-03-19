/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('pageTitle', pageTitle);

    function pageTitle() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/pageTitle.html',
            transclude: true
        };
        return directive;
    }

})();
