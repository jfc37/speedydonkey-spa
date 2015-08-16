(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('poliConfirm', poliConfirm);

    poliConfirm.$inject = ['poliPayment', 'routehelper'];

    function poliConfirm(poliPayment, routehelper) {
        var directive = {
            templateUrl: 'app/core/directives/onlinePayments/poliConfirm.html',
            scope: {
                config: '='
            },
            controllerAs: 'vm',
            controller: function ($scope, routehelper) {
                var vm = $scope;

                poliPayment.complete(vm.config.token).then(function () {
                    routehelper.redirectToRoute(vm.config.completeRoute, vm.config.completeRouteParameters);
                }, function () {
                    routehelper.redirectToRoute(vm.config.cancelRoute, vm.config.cancelRouteParameters);
                });
            }
        };
        return directive;
    }
})();
