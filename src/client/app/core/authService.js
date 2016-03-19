/*global rg4js*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    /* @ngInject */
    function authService($q, dataservice, auth, store, sectionBlockService) {

        var userClaims = [];

        var service = {
            login: login,

            logout: logout,

            hasClaim: hasClaim,
            profile: profile,
            isAuthenticated: isAuthenticated
        };

        init();

        return service;

        function login() {
            var deferred = $q.defer();

            auth.signin({
                authParams: {
                    scope: 'openid offline_access'
                }
            }, function (profile, token, access_token, state, refresh_token) {

                sectionBlockService.block({
                    promise: deferred.promise
                });

                store.set('profile', profile);
                store.set('token', token);
                store.set('refreshToken', refresh_token);
                setRaygunUser(profile.nickname, profile.email);
                angular.element('body').removeClass('canvas-menu');

                dataservice.getCurrentUserClaims().then(function (claims) {
                    userClaims = claims;
                }, function () {
                    userClaims = [];
                }).finally(function () {
                    store.set('userClaims', userClaims);
                    deferred.resolve();
                });
            }, function (error) {
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
            return userClaims.filter(function (userClaim) {
                return userClaim === claim;
            }).length > 0;
        }

        function logout() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            store.remove('refreshToken');
            store.remove('userClaims');
            angular.element('body').addClass('canvas-menu');
        }

        function init() {
            var savedClaims = store.get('userClaims');

            if (savedClaims) {
                userClaims = savedClaims;
            }
        }

    }
})();
