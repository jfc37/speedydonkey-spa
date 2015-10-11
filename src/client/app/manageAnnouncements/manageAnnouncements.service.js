(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .factory('manageAnnouncementsService', manageAnnouncementsService);

    /* @ngInject */
    function manageAnnouncementsService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService, simpleApiCaller) {

        var service = {
            send: send,
            create: create,
            update: update,
            getAnnouncements: getAnnouncements,
            deleteAnnouncement: deleteAnnouncement
        };

        function send(mail) {
            mail.type = 'email';
            var options = {
                resource: 'announcements',
                block: true
            };
            return simpleApiCaller.post(mail, options);
        }

        function create(announcement) {
            return $q(function (resolve, revoke) {
                dataCreateService.createAnnouncement(announcement).then(function (createdAnnouncement) {
                    resolve(createdAnnouncement);
                }, function (response) {
                    if (response.validationResult !== undefined) {
                        revoke(response.validationResult.validationErrors);
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
                    if (response.validationResult !== undefined) {
                        revoke(response.validationResult.validationErrors);
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
