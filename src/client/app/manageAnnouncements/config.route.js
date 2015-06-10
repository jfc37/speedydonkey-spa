(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/announcements',
                config: {
                    title: 'manageAnnouncements',
                    controller: 'ManageAnnouncements',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageAnnouncements/manageAnnouncements.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();
