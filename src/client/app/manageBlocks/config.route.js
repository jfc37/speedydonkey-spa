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
        return [{
                url: '/admin/manage/blocks',
                config: {
                    title: 'manageBlocks',
                    controller: 'ManageBlocks',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageBlocks/manageBlocks.html',
                    displayName: 'Blocks',
                    settings: {
                        nav: 10,
                        level: 2,
                        parent: 'admin dashboard'
                    },
                    claim: 'Admin'
                }
}, {
                url: '/admin/manage/blocks/create',
                config: {
                    title: 'createBlock',
                    controller: 'CreateBlock',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageBlocks/createBlock/createBlock.html',
                    claim: 'Admin'
                }
}, {
                url: '/admin/manage/blocks/:id',
                config: {
                    title: 'block',
                    controller: 'Block',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageBlocks/manageBlock/block.html',
                    claim: 'Admin'
                }
}, {
                url: '/admin/manage/blocks/:id/update',
                config: {
                    title: 'updateBlock',
                    controller: 'UpdateBlock',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageBlocks/updateBlock/updateBlock.html',
                    claim: 'Admin'
                }
}
        ];
    }
})();
