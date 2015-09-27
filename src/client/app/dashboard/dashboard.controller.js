(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    /* @ngInject */
    function Dashboard(authService) {
        var vm = this;
        vm.canPerformClassCheckIn = authService.hasClaim('Teacher');
    }
})();
