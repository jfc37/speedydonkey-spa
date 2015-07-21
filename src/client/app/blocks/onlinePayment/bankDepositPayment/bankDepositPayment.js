(function () {
    'use strict';

    angular
        .module('app.bankDepositPayment')
        .factory('bankDepositPayment', bankDepositPayment);

    bankDepositPayment.$inject = ['$q', 'simpleApiCaller'];

    /* @ngInject */
    function bankDepositPayment($q, simpleApiCaller) {
        var service = {
            begin: begin
        };

        return service;

        function begin(payment) {

            var options = {
                resource: 'online-payments/bank-deposit'
            };

            return $q(function (resolve, revoke) {
                simpleApiCaller.post(payment, options).then(function (response) {
                    window.location = payment.completeUrl;
                }, revoke);
            });
        }
    }
})();
