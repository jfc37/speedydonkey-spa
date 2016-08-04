(function () {
    'use strict';

    angular
        .module('app.core')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    // Must configure via the routehelperConfigProvider
    function routehelperConfig() {
        /* jshint validthis:true */
        this.config = {};

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $route, routehelperConfig, authService) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $routeProvider = routehelperConfig.config.$routeProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts,
            redirectToRoute: redirectToRoute,
            getRouteFromName: getRouteFromName
        };

        init();

        return service;
        ///////////////

        function configureRoutes(routes) {
            routes.forEach(function (route) {
                route.config.requiresLogin = !route.config.allowAnonymous;

                route.config.resolve =
                    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({
                redirectTo: '/login'
            });
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function (event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    $location.path('/');
                }
            );
        }

        function handleRoutingAuthorisation() {
            $rootScope.$on('$routeChangeStart',
                function (event, current, previous, rejection) {
                    if (current.$$route === undefined) {
                        redirectToRoute(getDefaultRoute());
                    }

                    if (!isAuthorisedForRoute(current.$$route)) {
                        event.preventDefault();
                        redirectToRoute(getDefaultRoute());
                    }
                }
            );
        }

        function init() {
            handleRoutingErrors();
            handleRoutingAuthorisation();
            updateDocTitle();
        }

        function getRoutes() {
            if (routes.length < 1) {
                for (var prop in $route.routes) {
                    if ($route.routes.hasOwnProperty(prop)) {
                        var route = $route.routes[prop];
                        var isRoute = !!route.title;
                        if (isRoute) {
                            routes.push(route);
                        }
                    }
                }
            }
            return routes.filter(isAuthorisedForRoute);
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function (event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }

        function redirectToRoute(routeName, routeParameters) {
            var routePath = getRouteFromName(routeName, routeParameters);
            if (window.location.pathname.indexOf('#') < 0) {
                window.location = '/#' + routePath;
            } else {
                $location.path(routePath);
            }
        }

        function getRouteFromName(routeName, routeParameters) {
            var routes = getRoutes().filter(function (route) {
                return route.title === routeName;
            });

            if (routes.length < 1) {
                return '';
            } else {
                var route = routes[0];
                var routePath = route.originalPath;
                if (routeParameters !== undefined && routeParameters !== null) {
                    for (var prop in routeParameters) {
                        if (routeParameters.hasOwnProperty(prop)) {
                            routePath = routePath.replace(':' + prop, routeParameters[prop]);
                        }
                    }
                }

                return routePath;
            }
        }

        /*private*/
        function isAuthorisedForRoute(route) {
            if (route) {
                if (!route.allowAnonymous && !authService.isAuthenticated()) {
                    return false;
                }
                if (route.denyAuthorised && authService.isAuthenticated()) {
                    return false;
                }
                if (route.claim && !authService.hasClaim(route.claim)) {
                    return false;
                }
            }
            return true;
        }

        function getDefaultRoute() {
            var defaultRoute = 'dashboard';
            if (!authService.isAuthenticated()) {
                defaultRoute = 'login';
            }

            return defaultRoute;
        }
    }
})();
