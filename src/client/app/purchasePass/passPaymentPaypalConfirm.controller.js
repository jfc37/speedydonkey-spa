(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .controller('PassPaymentPaypalConfirm', PassPaymentPaypalConfirm);

    PassPaymentPaypalConfirm.$inject = ['$routeParams'];

    /* @ngInject */
    function PassPaymentPaypalConfirm($routeParams) {
        /*jshint validthis: true */
        var vm = this;

        vm.paypalConfig = {
            token: $routeParams.token,
            payerId: $routeParams.PayerID,
            completeRoute: 'passPurchaseComplete',
            completeRouteParameters: {
                registrationNumber: $routeParams.registrationNumber
            }
        };
    }
})();
