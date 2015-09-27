(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('announcementsService', announcementsService);

    /* @ngInject */
    function announcementsService(simpleApiCaller) {
        /*jshint validthis: true */

        var service = {
            getAnnouncements: getAnnouncements
        };

        function getAnnouncements() {
            return simpleApiCaller.get({
                resource: 'announcements'
            }).then(function (response) {
                return response.data;
            });
        }

        return service;
    }
})();
