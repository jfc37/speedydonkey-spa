/*global rg4js*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    /* @ngInject */
    function authService($q, $http, userStorageService, base64Service, dataservice, auth, store, logger) {

        var service = {
            login: login,

            logout: logout,

            hasClaim: hasClaim,
            profile: profile,
            isAuthenticated: isAuthenticated,
            userId: userId
        };
        return service;

        function login() {
            var deferred = $q.defer();

            auth.signin({
                authParams: {
                    scope: 'openid offline_access'
                }
            }, function (profile, token, access_token, state, refresh_token) {

                store.set('profile', profile);
                store.set('token', token);
                store.set('refreshToken', refresh_token);
                setRaygunUser(profile.nickname, profile.email);
                angular.element('body').removeClass('canvas-menu');
                dataservice.getCurrentUserClaims().then(function (claims) {
                    profile.claims = claims;
                }, function () {
                    profile.claims = [];
                }).finally(function () {
                    store.set('profile', profile);
                    store.set('token', token);
                    store.set('refreshToken', refresh_token);
                    setRaygunUser(profile.nickname, profile.email);
                    angular.element('body').removeClass('canvas-menu');
                    deferred.resolve();
                });
            }, function (error) {
                logger.error('There was an error: ' + error);
                deferred.revoke();
            });

            return deferred.promise;
        }

        function isAuthenticated() {
            return auth.isAuthenticated;
        }

        function profile() {
            return auth.profile;
        }

        function userId() {
            return auth.profile.identities[0].user_id;
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
            if (!profile().claims) {
                return false;
            }

            return profile().claims.filter(function (userClaim) {
                return userClaim === claim;
            }).length > 0;
        }

        function logout() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            store.remove('refreshToken');
            angular.element('body').addClass('canvas-menu');
        }

    }
})();
