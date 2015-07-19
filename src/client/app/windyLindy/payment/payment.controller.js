(function () {
    'use strict';

    angular
        .module('app.windyLindy.payment')
        .controller('Payment', Payment);

    Payment.$inject = ['$routeParams', 'windyLindyService', 'routehelper'];

    /* @ngInject */
    function Payment($routeParams, windyLindyService, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.paymentConfig = {
            type: 'WindyLindyRegistration'
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
