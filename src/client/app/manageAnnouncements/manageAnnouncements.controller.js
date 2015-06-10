(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .controller('ManageAnnouncements', ManageAnnouncements);

    ManageAnnouncements.$inject = ['$q', 'logger', 'manageAnnouncementsService', 'blockUI'];

    /* @ngInject */
    function ManageAnnouncements($q, logger, manageAnnouncementsService, blockUI) {
        /*jshint validthis: true */
        var vm = this;
        vm.announcements = [];

        vm.addingNew = false;

        vm.addNew = function () {
            vm.newAnnouncement = {};
        };

        vm.cancelNew = function () {
            vm.newAnnouncement = undefined;
        };

        vm.createNew = function () {
            blockUI.start();
            manageAnnouncementsService.create(vm.newAnnouncement).then(function (announcement) {
                vm.announcements.push(announcement);
                vm.newAnnouncement = undefined;
                blockUI.stop();
            }, function () {
                blockUI.stop();
                logger.error('Issue creating announcement');
            });
        };

        vm.update = function (announcement) {
            blockUI.start();
            manageAnnouncementsService.update(vm.newAnnouncement).then(function (announcement) {
                blockUI.stop();
            }, function () {
                blockUI.stop();
                logger.error('Issue updating announcement');
            });
        };

        vm.cancelExisting = function (announcement) {
            announcement.updating = undefined;
        };

        vm.newOptions = {
            submitText: 'Create',
            cancelText: 'Cancel',
            submit: vm.createNew,
            cancel: vm.cancelNew
        };

        vm.existingOptions = {
            submitText: 'Update',
            cancelText: 'Cancel',
            submit: vm.update,
            cancel: vm.cancelExisting
        };

        vm.startUpdating = function (announcement) {
            announcement.updating = true;
        };

        vm.delete = function (announcement) {
            vm.announcements.remove(announcement);
        };

        activate();

        function activate() {
            blockUI.start();
            var promises = [getAnnouncements()];
            return $q.all(promises)
                .then(function () {
                    blockUI.stop();
                    logger.info('Activated Manage Announcements');
                });
        }

        function getAnnouncements() {
            manageAnnouncementsService.getAnnouncements().then(function (announcements) {
                vm.announcements = announcements;
            }, function () {
                logger.error('Failed to get announcements');
            });
        }
    }
})();
