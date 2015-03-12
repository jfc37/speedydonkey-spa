(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dashboardService', 'logger'];

    /* @ngInject */
    function Dashboard($q, dashboardService, logger) {
        /*jshint validthis: true */
        var vm = this;
    }
})();
