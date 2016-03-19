(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('sectionGroup', sectionGroup);

    function sectionGroup() {
        var directive = {
            templateUrl: 'app/core/directives/sectionLayout/sectionGroup.html',
            transclude: true,
            replace: true,
            require: '^form',
            scope: {
                'inputName': '@'
            },
            link: function (scope, elem, attrs, ctrl) {
                scope.form = ctrl;
            }
        };
        return directive;
    }

})();
