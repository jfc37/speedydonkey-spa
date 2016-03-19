(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/pass-options',
                config: {
                    title: 'managePassOptions',
                    controller: 'ManagePassOptions',
                    controllerAs: 'vm',
                    templateUrl: 'app/managePassOptions/managePassOptions.html',
                    displayName: 'Pass Options',
                    settings: {
                        nav: 40,
                        level: 2,
                        parent: 'admin dashboard'
                    },
                    claim: 'Admin'
                }
            },
            {
                url: '/admin/manage/pass-options/create',
                config: {
                    title: 'createPassOption',
                    controller: 'CreatePassOption',
                    controllerAs: 'vm',
                    templateUrl: 'app/managePassOptions/create/createPassOption.html',
                    claim: 'Admin'
                }
            },
            {
                url: '/admin/manage/pass-options/:id',
                config: {
                    title: 'updatePassOption',
                    controller: 'UpdatePassOption',
                    controllerAs: 'vm',
                    templateUrl: 'app/managePassOptions/update/updatePassOption.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();
