(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('paymentOptionDisplay', paymentOptionDisplay);

    function paymentOptionDisplay(paypalExpressCheckout, bankDepositPayment, logger) {
        var directive = {
            templateUrl: 'app/core/directives/onlinePayments/paymentOptionDisplay.html',
            require: ['ngModel'],
            scope: {
                ngModel: '=',
                paymentConfig: '='
            },
            link: function (scope, element, attrs) {
                scope.beginPaypalPayment = function () {
                    paypalExpressCheckout.beginGeneric(scope.paymentConfig).then(function (paypalUrl) {
                        window.location = paypalUrl;
                    }, function () {
                        paymentMethodError('PayPal');
                    });
                };

                scope.beginBankDeposit = function () {
                    bankDepositPayment.begin(scope.paymentConfig).then(function () {
                        window.location = scope.paymentConfig.completeUrl;
                    }, function () {
                        paymentMethodError('Bank Deposit');
                    });
                };

                function paymentMethodError(paymentMethod) {
                    logger.error('Looks like there\'s an issue with ' + paymentMethod + '. Try another payment method');
                }
            }
        };
        return directive;
    }
})();
