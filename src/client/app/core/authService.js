/*global rg4js*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    /* @ngInject */
    function authService($q, $http, userStorageService, base64Service, dataservice) {

        var userIdentity = {
            isLoggedIn: false
        };

        var service = {
            login: login,
            logout: logout,
            getUserIdentity: getUserIdentity,
            hasClaim: hasClaim
        };
        init();
        return service;

        function init() {
            var userCookie = userStorageService.getUser();
            if (userCookie !== undefined) {
                userIdentity = userCookie;
                setRaygunUser(userCookie.name, userCookie.username);
            }
            var authDataCookie = userStorageService.getUserAuthentication();
            if (authDataCookie !== undefined) {
                addBasicAuthorisation(authDataCookie);
            }

        }

        function setRaygunUser(name, email) {
            rg4js('setUser', {
                identifier: email,
                isAnonymous: false,
                email: email,
                firstName: name,
                fullName: name
            });
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

                        userStorageService.saveUserAuthentication(encoded);
                        userStorageService.saveUser(userIdentity);

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
            userStorageService.removeUserAuthentication();
            userStorageService.removeUser();
            $http.defaults.headers.common.Authorization = 'Basic ';
            angular.element('body').addClass('canvas-menu');
            userIdentity = {
                isLoggedIn: false
            };
        }

    }
})();
