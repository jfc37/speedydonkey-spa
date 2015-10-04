(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('paypalConfirm', paypalConfirm);

    /* @ngInject */
    function paypalConfirm(paypalExpressCheckout, routehelper) {
        var directive = {
            templateUrl: 'app/core/directives/onlinePayments/paypalConfirm.html',
            scope: {
                config: '='
            },
            controllerAs: 'vm',
            /* @ngInject */
            controller: function ($scope, routehelper) {
                var vm = $scope;

                paypalExpressCheckout.confirmGeneric(vm.config.token).then(function (payment) {
                    vm.payment = payment;
                });

                vm.complete = function () {
                    paypalExpressCheckout.completeGeneric(vm.config).then(function () {
                        routehelper.redirectToRoute(vm.config.completeRoute, vm.config.completeRouteParameters);
                    }, function () {
                        routehelper.redirectToRoute(vm.config.completeRoute, vm.config.completeRouteParameters);
                    });
                };
            }
        };
        return directive;
    }
})();
