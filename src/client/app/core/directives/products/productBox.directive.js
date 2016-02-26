/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('productBox', productBox);

    function productBox() {
        var directive = {
            templateUrl: 'app/core/directives/products/productBox.html',
            transclude: true
        };
        return directive;
    }

})();
