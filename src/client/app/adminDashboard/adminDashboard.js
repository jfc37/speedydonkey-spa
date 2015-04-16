(function () {
    'use strict';

    angular
        .module('app.adminDashboard')
        .controller('AdminDashboard', AdminDashboard);

    AdminDashboard.$inject = [];

    /* @ngInject */
    function AdminDashboard() {
        /*jshint validthis: true */
        var vm = this;
        vm.passOptionsUrl = '#/admin/manage/PassOptions';
    }
})();
