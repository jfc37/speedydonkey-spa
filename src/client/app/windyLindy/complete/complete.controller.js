(function () {
    'use strict';

    angular
        .module('app.windyLindy.complete')
        .controller('Complete', Complete);

    Complete.$inject = ['$routeParams', 'windyLindyService', 'routehelper'];

    /* @ngInject */
    function Complete($routeParams, windyLindyService, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.paymentConfig = {
            type: 'WindyLindyRegistration',
            paypal: {
                cancelUrl: '/windy-lindy/payment/' + $routeParams.id,
                returnUrl: '/windy-lindy/payment/' + $routeParams.id + 'paypal/confirm'
            },
            completeUrl: '/windy-lindy/payment/' + $routeParams.id + '/complete',
        };

        activate();

        function activate() {
            var id = $routeParams.id;
            windyLindyService.getRegistration(id).then(function (registration) {
                vm.registration = registration;

                vm.paymentConfig.type_id = registration.id;
            });
        }
    }
})();
