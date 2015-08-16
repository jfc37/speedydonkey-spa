(function () {
    'use strict';

    angular
        .module('app.windyLindy')
        .controller('PaypalConfirm', PaypalConfirm);

    PaypalConfirm.$inject = ['$routeParams', 'windyLindyService'];

    /* @ngInject */
    function PaypalConfirm($routeParams, windyLindyService) {
        /*jshint validthis: true */
        var vm = this;

        vm.paypalConfig = {
            token: $routeParams.token,
            payerId: $routeParams.PayerID,
            completeRoute: 'windy-lindy-complete',
            completeRouteParameters: {
                id: $routeParams.id
            }
        };
    }
})();
