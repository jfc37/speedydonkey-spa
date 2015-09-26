(function () {
    'use strict';

    angular
        .module('app.poliPayment')
        .factory('poliPayment', poliPayment);

    /* @ngInject */
    function poliPayment($q, config, simpleApiCaller) {
        var service = {
            begin: begin,
            complete: complete
        };

        return service;

        function begin(payment) {

            return $q(function (resolve, revoke) {

                var options = {
                    resource: 'online-payment/poli/begin'
                };

                var poliRequest = {
                    successUrl: 'http://' + config.spaUrl + payment.poli.returnUrl,
                    failureUrl: 'http://' + config.spaUrl + payment.poli.cancelUrl,
                    cancellationUrl: 'http://' + config.spaUrl + payment.poli.cancelUrl,
                    itemType: payment.type,
                    itemId: payment.typeId
                };

                simpleApiCaller.post(poliRequest, options).then(function (response) {
                    if (response.data.isValid) {
                        resolve(response.data.redirectUrl);
                    }
                    revoke();
                }, revoke);

            });
        }

        function complete(token) {

            return $q(function (resolve, revoke) {

                var options = {
                    resource: 'online-payment/poli/complete'
                };

                var poliRequest = {
                    token: token
                };

                simpleApiCaller.post(poliRequest, options).then(function (response) {
                    if (response.data.isValid) {
                        resolve();
                    }
                    revoke();
                }, revoke);

            });
        }
    }
})();
