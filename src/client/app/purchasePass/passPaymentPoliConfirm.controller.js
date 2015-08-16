(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .controller('PassPaymentPoliConfirm', PassPaymentPoliConfirm);

    PassPaymentPoliConfirm.$inject = ['$routeParams'];

    /* @ngInject */
    function PassPaymentPoliConfirm($routeParams) {
        /*jshint validthis: true */
        var vm = this;

        vm.poliConfig = {
            token: $routeParams.token,
            completeRoute: 'passPurchaseComplete',
            completeRouteParameters: {
                registrationNumber: $routeParams.registrationNumber
            },
            cancelRoute: 'purchasePass',
            cancelRouteParameters: {
                registrationNumber: $routeParams.registrationNumber
            },
        };
    }
})();
