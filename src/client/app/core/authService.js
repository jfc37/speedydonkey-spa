(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$http', '$cookieStore', 'base64Service'];

    /* @ngInject */
    function authService($http, $cookieStore, base64Service){

        return {
            setCredentials: function (username, password) {
                var encoded = base64Service.encode(username + ':' + password);
                $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
                $cookieStore.put('authdata', encoded);
            },
            clearCredentials: function () {
                document.execCommand("ClearAuthenticationCache");
                $cookieStore.remove('authdata');
                $http.defaults.headers.common.Authorization = 'Basic ';
            }
        };

    }
})();