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
            }
        ];
    }
})();
