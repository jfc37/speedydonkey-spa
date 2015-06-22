(function () {
    'use strict';

    angular
        .module('app.paypalExpressCheckout')
        .factory('paypalExpressCheckout', paypalExpressCheckout);

    paypalExpressCheckout.$inject = ['apiCaller', 'config'];

    /* @ngInject */
    function paypalExpressCheckout(apiCaller, config) {
        var service = {
            begin: begin
        };

        return service;

        function begin(pass) {
            var options = {
                return_url: config.paypal.returnUrl,
                cancel_url: config.paypal.cancelUrl,
                template_id: pass.id
            };
            return apiCaller.beginExpressCheckout(options);
        }
    }
})();
