(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userStorageService', userStorageService);

    /* @ngInject */
    function userStorageService($cookies) {
        var useCookies = true;

        var service = {
            getUser: getUser,
            getUserAuthentication: getUserAuthentication,

            saveUser: saveUser,
            saveUserAuthentication: saveUserAuthentication,

            removeUser: removeUser,
            removeUserAuthentication: removeUserAuthentication
        };

        function getUser() {
            if (useCookies) {
                return $cookies.getObject('authuser');
            }
        }

        function getUserAuthentication() {
            if (useCookies) {
                return $cookies.get('authdata');
            }
        }

        function saveUser(user) {
            if (useCookies) {
                return $cookies.putObject('authuser', user);
            }
        }

        function saveUserAuthentication(userAuthentication) {
            if (useCookies) {
                return $cookies.put('authdata', userAuthentication);
            }
        }

        function removeUserAuthentication(userAuthentication) {
            if (useCookies) {
                return $cookies.remove('authdata', userAuthentication);
            }
        }

        function removeUser(user) {
            if (useCookies) {
                return $cookies.remove('authuser', user);
            }
        }

        return service;
    }
})();
