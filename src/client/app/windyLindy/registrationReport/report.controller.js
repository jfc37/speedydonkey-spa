(function () {
    'use strict';

    angular
        .module('app.windyLindy')
        .controller('Report', Report);

    Report.$inject = ['windyLindyService'];

    /* @ngInject */
    function Report(windyLindyService) {
        /*jshint validthis: true */
        var vm = this;

        vm.registrations = [];

        vm.getTotalPaid = function () {
            return getByStatus('Paid').length;
        };

        vm.getTotalPending = function () {
            return getByStatus('Pending').length;
        };

        vm.getTotalFullPasses = function () {
            return getByType(true).length;
        };

        vm.getTotalPartialPasses = function () {
            return getByType(false).length;
        };

        activate();

        function activate() {
            windyLindyService.getAllRegistrations().then(function (registrations) {
                vm.registrations = registrations;
            });
        }

        function getByStatus(status) {
            return vm.registrations.filter(function (reg) {
                return reg.paymentStatus === status;
            });
        }

        function getByType(fullPass) {
            return vm.registrations.filter(function (reg) {
                return reg.fullPass === fullPass;
            });
        }
    }
})();
