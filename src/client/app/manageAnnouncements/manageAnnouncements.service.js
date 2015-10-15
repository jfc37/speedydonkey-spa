(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .factory('manageAnnouncementsService', manageAnnouncementsService);

    /* @ngInject */
    function manageAnnouncementsService(simpleApiCaller) {

        var service = {
            send: send
        };

        function send(mail) {

            var mailToSend = {
                notifyAll: mail.notifyAll,
                message: mail.message,
                subject: mail.subject
            };

            if (!mailToSend.notifyAll) {
                mailToSend.receivers = mail.receivers.map(function (block) {
                    return {
                        id: block.id
                    };
                });
            }

            var options = {
                resource: 'announcements'
            };

            return simpleApiCaller.post(mailToSend, options);
        }

        return service;
    }
})();
