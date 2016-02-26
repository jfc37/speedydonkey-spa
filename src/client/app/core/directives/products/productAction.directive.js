/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('productAction', productAction);

    function productAction() {
        var directive = {
            templateUrl: 'app/core/directives/products/productAction.html',
            transclude: true
        };
        return directive;
    }

})();
