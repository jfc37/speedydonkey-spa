(function () {
    'use strict';

    angular
        .module('app.paypalExpressCheckout')
        .factory('paypalExpressCheckout', paypalExpressCheckout);

    paypalExpressCheckout.$inject = ['$q', 'apiCaller', 'config'];

    /* @ngInject */
    function paypalExpressCheckout($q, apiCaller, config) {
        var service = {
            begin: begin,
            confirm: confirm,
            complete: complete
        };

        return service;

        function begin(pass) {
            var options = {
                return_url: 'http://' + config.spaUrl + '/' + config.paypal.returnUrl,
                cancel_url: 'http://' + config.spaUrl + '/' + config.paypal.cancelUrl,
                template_id: pass.id
            };
            return apiCaller.beginExpressCheckout(options);
        }

        function confirm(token) {
            return $q(function (resolve, revoke) {
                apiCaller.confirmExpressCheckout({
                    token: token
                }).then(function (response) {
                    if (response.data && response.data.validation_result) {
                        if (response.data.validation_result.is_valid) {
                            resolve(response.data.action_result);
                        } else {
                            revoke(response.data.validation_result);
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
    }
})();
