(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('itemSummary', itemSummary);

    function itemSummary() {
        var directive = {
            templateUrl: 'app/core/directives/onlinePayments/itemSummary.html',
            scope: {
                description: '=',
                amount: '='
            },
            link: function (scope, element, attrs) {
                scope.description = attrs.description;
                scope.amount = attrs.amount;
            }
        };
        return directive;
    }
})();
