(function () {
    'use strict';

    angular.module('app.adminDashboard')
        .controller('AdminDashboard', AdminDashboard);

    /* @ngInject */
    function AdminDashboard(authService) {
        /*jshint validthis: true */
        var vm = this;

        vm.isAdmin = authService.hasClaim('Admin');

        vm.passOptionsUrl = '#/admin/manage/PassOptions';
        vm.blocksUrl = '#/admin/manage/blocks';
        vm.classesUrl = '#/admin/manage/classes';
        vm.teachersUrl = '#/admin/manage/teachers';
        vm.announcementsUrl = '#/admin/email-center';
        vm.studentsUrl = '#/admin/manage/students';
    }
})();
