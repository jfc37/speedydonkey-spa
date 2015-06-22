(function () {
    'use strict';

    angular
        .module('app.paypalExpressCheckout')
        .factory('paypalExpressCheckout', paypalExpressCheckout);

    paypalExpressCheckout.$inject = ['apiCaller', 'config'];

    /* @ngInject */
    function paypalExpressCheckout(apiCaller, config) {
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
            return apiCaller.confirmExpressCheckout({
                token: token
            });
        }

        function complete(token) {
            return apiCaller.completeExpressCheckout({
                token: token
            });
        }
    }
})();
