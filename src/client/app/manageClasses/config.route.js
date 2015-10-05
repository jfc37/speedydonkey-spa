(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/classes/:id',
                config: {
                    title: 'class',
                    controller: 'Class',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageClasses/class.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();
