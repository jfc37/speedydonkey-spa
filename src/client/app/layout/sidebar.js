(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    /* @ngInject */
    function Sidebar($route, routehelper) {
        var vm = this;
        var routes = routehelper.getRoutes();

        vm.getCurrentRoute = function () {
            return $route;
        };

        vm.isCurrent = function (route, currentRoute) {
            if (!route.title || !currentRoute.current || !currentRoute.current.title) {
                return '';
            }
            var menuName = route.title;

            if (isActive(route, currentRoute) || vm.getChildItems(route, currentRoute).filter(isActive).length > 0) {
                return 'active';
            }

            return '';
        };

        function isActive(route, currentRoute) {
            if (!route.title || !currentRoute.current || !currentRoute.current.title) {
                return false;
            }
            var menuName = route.title;
            return currentRoute.current.title.substr(0, menuName.length) === menuName;
        }

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
