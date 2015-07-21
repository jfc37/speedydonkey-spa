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
                    paypalExpressCheckout.beginGeneric(scope.paymentConfig);
                };

                scope.beginBankDeposit = function () {
                    bankDepositPayment.begin(scope.paymentConfig).then(function () {

                    }, function () {
                        logger.error('Looks like there\'s an issue with Bank Deposit. Try another payment method');
                        window.location = scope.paymentConfig.completeUrl;
                    });
                };
            }
        };
        return directive;
    }
})();
