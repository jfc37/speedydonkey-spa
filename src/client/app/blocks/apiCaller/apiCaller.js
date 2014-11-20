(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('apiCaller', apiCaller);

    apiCaller.$inject = ['$q', '$http', 'logger'];

    /* @ngInject */
    function apiCaller($q, $http, logger) {
        var service = {
            postUser : postUser,
            postPerson : postPerson,
        };

        var baseUrl = 'http://api-studybuddy.azurewebsites.net/api/';

        return service;

        function postUser(user) {
            var url = baseUrl + 'users';
            return $http.post(url, user);
        }

        function postPerson(parameters, person) {
            var url = baseUrl + 'users/' + parameters.user_id + '/' + person.role;
            return $http.post(url, person);
        }
    }
})();