(function () {
    'use strict';

    angular
        .module('app.poliPayment')
        .factory('poliPayment', poliPayment);

    poliPayment.$inject = ['$q', 'config', 'simpleApiCaller'];

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
                    success_url: 'http://' + config.spaUrl + payment.poli.returnUrl,
                    failure_url: 'http://' + config.spaUrl + payment.poli.cancelUrl,
                    cancellation_url: 'http://' + config.spaUrl + payment.poli.cancelUrl,
                    item_type: payment.type,
                    item_id: payment.type_id
                };

                simpleApiCaller.post(poliRequest, options).then(function (response) {
                    if (response.data.is_valid) {
                        resolve(response.data.redirect_url);
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
                    if (response.data.is_valid) {
                        resolve();
                    }
                    revoke();
                }, revoke);

            });
        }
    }
})();
