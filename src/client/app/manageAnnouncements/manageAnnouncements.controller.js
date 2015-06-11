(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .controller('ManageAnnouncements', ManageAnnouncements);

    ManageAnnouncements.$inject = ['$q', 'logger', 'manageAnnouncementsService', 'blockUI', 'selectOptionService'];

    /* @ngInject */
    function ManageAnnouncements($q, logger, manageAnnouncementsService, blockUI, selectOptionService) {
        /*jshint validthis: true */
        var vm = this;
        vm.announcements = [];

        vm.showReceivers = function (announcement) {
            if (announcement.notify_all) {
                return 'Everyone';
            }
            return announcement.receivers.select('name').join(', ');
        };

        vm.showType = function (type) {
            return selectOptionService.getAnnouncementTypes().getFirstOrDefault('value', type).display;
        };

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
            manageAnnouncementsService.deleteAnnouncement(announcement.id).then(function () {
                vm.announcements.remove(announcement);
                logger.success('Deleted announcement');
            }, function () {
                logger.error('Issue deleting announcement');
            });
        };

        activate();

        function activate() {
            blockUI.start();
            return getAnnouncements()
                .then(function () {
                    blockUI.stop();
                    logger.info('Activated Manage Announcements');
                });
        }

        function getAnnouncements() {
            return manageAnnouncementsService.getAnnouncements().then(function (announcements) {
                vm.announcements = announcements;
            }, function () {
                logger.error('Failed to get announcements');
            });
        }
    }
})();
