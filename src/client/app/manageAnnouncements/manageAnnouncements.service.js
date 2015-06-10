(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .factory('manageAnnouncementsService', manageAnnouncementsService);

    manageAnnouncementsService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function manageAnnouncementsService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService) {

        var service = {
            create: create,
            update: update,
            getAnnouncements: getAnnouncements,
            deleteAnnouncement: deleteAnnouncement
        };

        function create(announcement) {
            return $q(function (resolve, revoke) {
                dataCreateService.createAnnouncement(announcement).then(function (createdAnnouncement) {
                    resolve(createdAnnouncement);
                }, function (response) {
                    if (response.validation_result !== undefined) {
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function update(announcement) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateAnnouncement(announcement).then(function (updatedAnnouncement) {
                    resolve(updatedAnnouncement);
                }, function (response) {
                    if (response.validation_result !== undefined) {
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function getAnnouncements() {
            return $q(function (resolve, revoke) {
                dataservice.getAnnouncements().then(function (announcements) {
                    resolve(announcements);
                }, revoke);
            });
        }

        function deleteAnnouncement(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteAnnouncement(id).then(resolve, revoke);
            });
        }

        return service;

    }
})();
