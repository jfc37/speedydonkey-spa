(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .controller('PassPaymentPaypalConfirm', PassPaymentPaypalConfirm);

    /* @ngInject */
    function PassPaymentPaypalConfirm($routeParams) {
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
