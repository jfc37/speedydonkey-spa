(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$q', '$http', '$cookieStore', 'base64Service', 'logger'];

    /* @ngInject */
    function authService($q, $http, $cookieStore, base64Service, logger){

        var userIdentity = {
            isLoggedIn: false
        }

        var service = {
            login: login,
            logout: logout,
            getUserIdentity: getUserIdentity
        };
        init();
        return service;

        function init() {
            var userCookie = $cookieStore.get('authuser');
            if (userCookie !== undefined){
                userIdentity = userCookie;
            }

        }

        function getUserIdentity() {
            return userIdentity;
        }

        function login(username, password) {
            var encoded = base64Service.encode(username + ':' + password);
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;

            userIdentity.isLoggedIn = true;
            userIdentity.username = username;

            $cookieStore.put('authdata', encoded);
            $cookieStore.put('authuser', userIdentity);
        };

        function logout() {
            document.execCommand("ClearAuthenticationCache");
            $cookieStore.remove('authdata');
            $cookieStore.remove('authuser');
            $http.defaults.headers.common.Authorization = 'Basic ';

            userIdentity = {
                isLoggedIn: false
            };

            logger.success('Successfully logged out');
        };

    }
})();