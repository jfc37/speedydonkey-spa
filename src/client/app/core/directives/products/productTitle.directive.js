/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('productTitle', productTitle);

    function productTitle() {
        var directive = {
            templateUrl: 'app/core/directives/products/productTitle.html',
            transclude: true
        };
        return directive;
    }

})();
