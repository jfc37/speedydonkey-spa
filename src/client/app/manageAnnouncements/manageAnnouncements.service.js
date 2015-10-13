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
            mail.receivers = mail.receivers.map(function (block) {
                return {
                    id: block.id
                };
            });

            mail.type = 'email';
            var options = {
                resource: 'announcements',
                block: true
            };
            return simpleApiCaller.post(mail, options);
        }

        return service;
    }
})();
