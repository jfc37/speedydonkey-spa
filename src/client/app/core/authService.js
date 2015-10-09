/*global Raygun*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    /* @ngInject */
    function authService($q, $http, $cookieStore, base64Service, dataservice) {

        var userIdentity = {
            isLoggedIn: false
        };

        var service = {
            login: login,
            logout: logout,
            getUserIdentity: getUserIdentity,
            setUserIdentityProperty: setUserIdentityProperty,
            hasClaim: hasClaim
        };
        init();
        return service;

        function init() {
            var userCookie = $cookieStore.get('authuser');
            if (userCookie !== undefined) {
                userIdentity = userCookie;
                setRaygunUser(userCookie.name, userCookie.username);
                throw new Error('xxx');
            }
            var authDataCookie = $cookieStore.get('authdata');
            if (authDataCookie !== undefined) {
                addBasicAuthorisation(authDataCookie);
            }

        }

        function setRaygunUser(name, email) {
            Raygun.setUser(name, false, email, name);
        }

        function hasClaim(claim) {
            if (!userIdentity.claims) {
                return false;
            }

            return userIdentity.claims.filter(function (userClaim) {
                return userClaim === claim;
            }).length > 0;
        }

        function getUserIdentity() {
            return userIdentity;
        }

        function setUserIdentityProperty(propertyName, propertyValue) {
            userIdentity[propertyName] = propertyValue;
            $cookieStore.put('authuser', userIdentity);
        }

        function login(email, password) {
            var encoded = base64Service.encode(email + ':' + password);
            addBasicAuthorisation(encoded);

            return $q(function (resolve, revoke) {
                dataservice.getCurrentUser().then(function (user) {

                    angular.element('body').removeClass('canvas-menu');

                    dataservice.getCurrentUserClaims().then(function (claims) {
                        userIdentity.isLoggedIn = true;
                        userIdentity.username = email;

                        userIdentity.userId = user.id;
                        userIdentity.name = user.fullName;
                        userIdentity.claims = claims;

                        $cookieStore.put('authdata', encoded);
                        $cookieStore.put('authuser', userIdentity);

                        resolve();
                    }, function () {
                        userIdentity.isLoggedIn = true;
                        userIdentity.username = email;

                        userIdentity.userId = user.id;
                        userIdentity.name = user.fullName;
                        userIdentity.claims = [];
                        resolve();
                    }).finally(function () {
                        setRaygunUser(user.fullName, user.username);
                    });
                }, function (response) {
                    logout();
                    if (response.status === 401) {
                        revoke([{
                            propertyName: 'global',
                            errorMessage: 'Invalid email or password'
                        }]);
                    }
                });
            });
        }

        function addBasicAuthorisation(encoded) {
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        }

        function logout() {
            document.execCommand('ClearAuthenticationCache');
            $cookieStore.remove('authdata');
            $cookieStore.remove('authuser');
            $http.defaults.headers.common.Authorization = 'Basic ';
            angular.element('body').addClass('canvas-menu');
            userIdentity = {
                isLoggedIn: false
            };
        }

    }
})();
