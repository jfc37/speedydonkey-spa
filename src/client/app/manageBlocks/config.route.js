(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/blocks',
                config: {
                    title: 'manageBlocks',
                    controller: 'ManageBlocks',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageBlocks/manageBlocks.html',
                    claim: 'Admin'
                }
            },
            {
                url: '/admin/manage/blocks/:id/update',
                config: {
                    title: 'updateBlock',
                    controller: 'UpdateBlock',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageBlocks/updateBlock/updateBlock.html',
                    claim: 'Admin'
                }
            },
            {
                url: '/admin/manage/blocks/create',
                config: {
                    title: 'createBlock',
                    controller: 'CreateBlock',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageBlocks/createBlock/createBlock.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();
