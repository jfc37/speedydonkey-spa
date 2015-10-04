(function () {
    'use strict';

    angular
        .module('app.windyLindy')
        .controller('PoliConfirm', PoliConfirm);

    PoliConfirm.$inject = ['$routeParams'];

    /* @ngInject */
    function PoliConfirm($routeParams) {
        var vm = this;

        vm.poliConfig = {
            token: $routeParams.token,
            completeRoute: 'windy-lindy-complete',
            completeRouteParameters: {
                id: $routeParams.id
            },
            cancelRoute: 'windy-lindy-payment',
            cancelRouteParameters: {
                id: $routeParams.id
            },
        };
    }
})();
