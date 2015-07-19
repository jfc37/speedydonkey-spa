(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('paymentOptionDisplay', paymentOptionDisplay);

    function paymentOptionDisplay(paypalExpressCheckout) {
        var directive = {
            templateUrl: 'app/core/directives/onlinePayments/paymentOptionDisplay.html',
            require: ['ngModel'],
            scope: {
                ngModel: '=',
                paymentConfig: '='
            },
            link: function (scope, element, attrs) {
                scope.beginPaypalPayment = function () {
                    paypalExpressCheckout.beginGeneric(scope.paymentConfig);
                };
            }
        };
        return directive;
    }
})();
