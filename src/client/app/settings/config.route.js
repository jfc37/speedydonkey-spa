(function () {
    'use strict';

    angular
        .module('app.settings')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/settings',
                config: {
                    title: 'settings',
                    controller: 'Settings',
                    controllerAs: 'vm',
                    templateUrl: 'app/settings/settings.html',
                    displayName: 'Settings',
                    claim: 'Admin',
                    settings: {
                        nav: 10,
                        level: 2,
                        parent: 'admin dashboard'
                    },
                }
            }
        ];
    }
})();
