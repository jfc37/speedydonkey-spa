(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .controller('PassPayment', PassPayment);

    PassPayment.$inject = ['$routeParams', 'purchasePassService', 'logger'];

    /* @ngInject */
    function PassPayment($routeParams, purchasePassService, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.paymentConfig = {
            type: 'Pass',
            type_id: $routeParams.id,
            paypal: {
                cancelUrl: '/#/purchase-pass',
                returnUrl: '/#/purchase-pass/payment/{referenceNumber}/paypal/confirm'
            },
            poli: {
                cancelUrl: '/#/purchase-pass',
                returnUrl: '/#/purchase-pass/payment/{referenceNumber}/poli/confirm'
            },
            completeUrl: '#/purchase-pass/payment/{referenceNumber}/complete',
        };

        vm.title = 'Purchase Pass';

        activate();

        function activate() {
            getPassOption();
        }

        function getPassOption() {
            return purchasePassService.getPassOption($routeParams.id).then(function (pass) {
                vm.pass = pass;
            }, function (error) {
                if (!error.displayMessage) {
                    error.arePassesLoading = 'Issue getting pass options...';
                }
                logger.error(error.displayMessage);
            });
        }
    }
})();
