(function () {
    'use strict';

    angular
        .module('app.paypalExpressCheckout')
        .factory('paypalExpressCheckout', paypalExpressCheckout);

    /* @ngInject */
    function paypalExpressCheckout($q, apiCaller, config, simpleApiCaller) {
        var service = {
            begin: begin,
            beginGeneric: beginGeneric,
            confirm: confirm,
            confirmGeneric: confirmGeneric,
            complete: complete,
            completeGeneric: completeGeneric
        };

        return service;

        function beginGeneric(payment) {

            return $q(function (resolve, revoke) {

                var options = {
                    resource: 'online-payment/paypal/begin'
                };

                var paypalRequest = {
                    returnUrl: 'http://' + config.spaUrl + payment.paypal.returnUrl,
                    cancelUrl: 'http://' + config.spaUrl + payment.paypal.cancelUrl,
                    itemType: payment.type,
                    itemId: payment.typeId
                };

                simpleApiCaller.post(paypalRequest, options).then(function (response) {
                    var paypalUrl = config.paypal.paymentUrl + response.data.token;
                    resolve(paypalUrl);
                }, revoke);

            });
        }

        function begin(pass) {
            var options = {
                returnUrl: 'http://' + config.spaUrl + '/' + config.paypal.returnUrl,
                cancelUrl: 'http://' + config.spaUrl + '/' + config.paypal.cancelUrl,
                templateId: pass.id
            };
            return apiCaller.beginExpressCheckout(options);
        }

        function confirmGeneric(token) {
            return $q(function (resolve, revoke) {

                var options = {
                    resource: 'online-payment/paypal/confirm'
                };

                simpleApiCaller.post({
                    token: token
                }, options).then(function (response) {
                    if (response.data.errors.any()) {
                        revoke(response.data);
                    } else {
                        resolve(response.data);
                    }
                }, revoke);
            });
        }

        function confirm(token) {
            return $q(function (resolve, revoke) {
                apiCaller.confirmExpressCheckout({
                    token: token
                }).then(function (response) {
                    if (response.data && response.data.validationResult) {
                        if (response.data.validationResult.isValid) {
                            resolve(response.data.actionResult);
                        } else {
                            revoke(response.data.validationResult);
                        }
                    } else {
                        revoke();
                    }
                }, revoke);
            });
        }

        function complete(token) {
            return apiCaller.completeExpressCheckout({
                token: token
            });
        }

        function completeGeneric(completionOptions) {
            return simpleApiCaller.post({
                token: completionOptions.token
            }, {
                resource: 'online-payment/paypal/complete'
            });
        }
    }
})();
