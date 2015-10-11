(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .controller('ManageAnnouncements', ManageAnnouncements);

    /* @ngInject */
    function ManageAnnouncements($q, logger, manageAnnouncementsService, blockUI, selectOptionService) {
        /*jshint validthis: true */
        var vm = this;

        vm.mail = {
            subject: 'Subject',
            recipients: []
        };

        vm.send = function () {
            alert(vm.mail.message);
        }
    }
})();
