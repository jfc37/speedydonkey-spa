/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('sectionForm', sectionForm);

    function sectionForm() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/sectionForm.html',
            transclude: true
        };
        return directive;
    }

})();
