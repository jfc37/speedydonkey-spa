(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [{
            url: '/admin/manage/events',
            config: {
                title: 'manageStandAloneEvents',
                controller: 'ManageStandAloneEvents',
                controllerAs: 'vm',
                templateUrl: 'app/standAloneEvents/manageStandAloneEvents/manageStandAloneEvents.html',
                displayName: 'Events',
                settings: {
                    nav: 60,
                    level: 2,
                    parent: 'admin dashboard'
                },
                claim: 'Admin'
            }
        }, {
            url: '/admin/manage/events/create',
            config: {
                title: 'createStandAloneEvents',
                controller: 'CreateStandAloneEvent',
                controllerAs: 'vm',
                templateUrl: 'app/standAloneEvents/createStandAloneEvents/createStandAloneEvent.html',
                claim: 'Admin'
            }
        }, {
            url: '/admin/manage/events/:id',
            config: {
                title: 'event',
                controller: 'StandAloneEvent',
                controllerAs: 'vm',
                templateUrl: 'app/standAloneEvents/manageStandAloneEvent/standAloneEvent.html',
                claim: 'Admin'
            }
        }];
    }
})();
