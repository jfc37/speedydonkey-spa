/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('productDescription', productDescription);

    function productDescription() {
        var directive = {
            templateUrl: 'app/core/directives/products/productDescription.html',
            transclude: true
        };
        return directive;
    }

})();
