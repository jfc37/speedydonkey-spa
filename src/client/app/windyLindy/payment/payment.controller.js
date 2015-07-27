(function () {
    'use strict';

    angular
        .module('app.windyLindy')
        .controller('Payment', Payment);

    Payment.$inject = ['$routeParams', 'windyLindyService', 'routehelper'];

    /* @ngInject */
    function Payment($routeParams, windyLindyService, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.paymentConfig = {
            type: 'WindyLindy',
            paypal: {
                cancelUrl: '/#/windy-lindy/payment/' + $routeParams.id,
                returnUrl: '/#/windy-lindy/payment/' + $routeParams.id + '/paypal/confirm'
            },
            poli: {
                cancelUrl: '/#/windy-lindy/payment/' + $routeParams.id,
                returnUrl: '/#/windy-lindy/payment/' + $routeParams.id + '/poli/confirm'
            },
            completeUrl: '#/windy-lindy/payment/' + $routeParams.id + '/complete',
        };

        activate();

        function activate() {
            var id = $routeParams.id;
            windyLindyService.getRegistration(id).then(function (registration) {
                vm.registration = registration;

                vm.paymentConfig.type_id = registration.registation_id;
            });
        }
    }
})();
