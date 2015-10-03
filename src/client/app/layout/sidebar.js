(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    /* @ngInject */
    function Sidebar($route, routehelper) {
        var vm = this;
        var routes = routehelper.getRoutes();

        vm.isCurrent = function (route) {
            if (!route.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
        };

        vm.getChildItems = function (parentRoute) {
            return routes.filter(function (route) {
                return route.settings && route.settings.level > 1 && route.settings.parent === parentRoute.title;
            }).sort(function (r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        };

        vm.hasChildItems = function (parentRoute) {
            return vm.getChildItems(parentRoute).length > 0;
        };

        activate();

        function activate() {
            getNavRoutes();
        }

        function getNavRoutes() {
            vm.navRoutes = routes.filter(function (r) {
                return r.settings && r.settings.nav && r.settings.level === 1;
            }).sort(function (r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }
    }
})();
