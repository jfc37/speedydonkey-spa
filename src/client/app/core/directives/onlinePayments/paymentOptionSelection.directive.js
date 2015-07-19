(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('paymentOptionSelection', paymentOptionSelection);

    function paymentOptionSelection() {
        var directive = {
            templateUrl: 'app/core/directives/onlinePayments/paymentOptionSelection.html',
            require: ['ngModel'],
            scope: {
                ngModel: '='
            }
        };
        return directive;
    }
})();
