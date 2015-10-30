(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userStorageService', userStorageService);

    /* @ngInject */
    function userStorageService($cookies, localStorageService) {
        var userKey = 'authuser';
        var userAuthenticationKey = 'authdata';

        var expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);
        var cookieOptions = {
            secure: true,
            expiry: expiryDate
        };

        var service = {
            getUser: getUser,
            getUserAuthentication: getUserAuthentication,

            saveUser: saveUser,
            saveUserAuthentication: saveUserAuthentication,

            removeUser: removeUser,
            removeUserAuthentication: removeUserAuthentication
        };

        function getUser() {
            if (localStorageService.isSupported) {
                return localStorageService.get(userKey);
            } else {
                return $cookies.getObject(userKey);
            }
        }

        function getUserAuthentication() {
            if (localStorageService.isSupported) {
                return localStorageService.get(userAuthenticationKey);
            } else {
                return $cookies.get(userAuthenticationKey);
            }
        }

        function saveUser(user) {
            if (localStorageService.isSupported) {
                localStorageService.set(userKey, user);
            } else {
                $cookies.putObject(userKey, user, cookieOptions);
            }
        }

        function saveUserAuthentication(userAuthentication) {
            if (localStorageService.isSupported) {
                localStorageService.set(userAuthenticationKey, userAuthentication);
            } else {
                return $cookies.put(userAuthenticationKey, userAuthentication, cookieOptions);
            }
        }

        function removeUserAuthentication() {
            if (localStorageService.isSupported) {
                return localStorageService.remove(userAuthenticationKey);
            } else {
                return $cookies.remove(userAuthenticationKey);
            }
        }

        function removeUser() {
            if (localStorageService.isSupported) {
                return localStorageService.remove(userKey);
            } else {
                return $cookies.remove(userKey);
            }
        }

        return service;
    }
})();
