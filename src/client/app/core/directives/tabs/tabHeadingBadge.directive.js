(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('tabHeadingBadge', tabHeadingBadge);

    function tabHeadingBadge() {
        var directive = {
            templateUrl: 'app/core/directives/tabs/tabHeadingBadge.html',
            transclude: true,
            replace: true
        };
        return directive;
    }

})();
