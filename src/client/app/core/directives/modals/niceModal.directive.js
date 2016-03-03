(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('niceModal', niceModal);

    function niceModal() {
        var directive = {
            templateUrl: 'app/core/directives/modals/niceModal.html',
            transclude: true,
            replace: true
        };
        return directive;
    }

})();
