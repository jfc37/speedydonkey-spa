(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/email-center',
                config: {
                    title: 'manageAnnouncements',
                    controller: 'ManageAnnouncements',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageAnnouncements/manageAnnouncements.html',
                    displayName: 'Email Center',
                    settings: {
                        nav: 5,
                        level: 2,
                        parent: 'admin dashboard'
                    },
                    claim: 'Admin'
                }
            }
        ];
    }
})();
