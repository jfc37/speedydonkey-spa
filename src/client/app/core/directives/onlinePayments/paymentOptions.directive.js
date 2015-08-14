(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('paymentOptions', paymentOptions);

    function paymentOptions(paypalExpressCheckout, poliPayment, logger, blockUI) {
        var directive = {
            templateUrl: 'app/core/directives/onlinePayments/paymentOption.html',
            require: ['ngModel'],
            scope: {
                ngModel: '=',
                paymentConfig: '='
            },
            link: function (scope, element, attrs) {
                scope.beginPaypalPayment = function () {
                    blockUI.start();
                    paypalExpressCheckout.beginGeneric(scope.paymentConfig).then(function (paypalUrl) {
                        window.location = paypalUrl;
                    }, function () {
                        paymentMethodError('PayPal');
                    });
                };

                scope.beginPoliPayment = function () {
                    poliPayment.begin(scope.paymentConfig).then(function (poliUrl) {
                        blockUI.start();
                        window.location = poliUrl;
                    }, function () {
                        paymentMethodError('Poli');
                    });
                };

                function paymentMethodError(paymentMethod) {
                    blockUI.stop();
                    logger.error('Looks like there\'s an issue with ' + paymentMethod + '. Try another payment method');
                }
            }
        };
        return directive;
    }
})();
