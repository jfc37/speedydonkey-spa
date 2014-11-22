(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('apiCaller', apiCaller);

    apiCaller.$inject = ['$q', '$http', 'logger'];

    /* @ngInject */
    function apiCaller($q, $http, logger) {
        var service = {
            searchUser: searchUser,
            postUser : postUser,

            postPerson : postPerson,

            getCourse : getCourse
        };

        var baseUrl = 'http://api-studybuddy.azurewebsites.net/api/';

        return service;

        function searchUser(search) {
            var url = baseUrl + 'users?q=' + search;

            return $http.get(url);
        }

        function postUser(user) {
            var url = baseUrl + 'users';
            return $http.post(url, user);
        }

        function postPerson(parameters, person) {
            var url = baseUrl + 'users/' + parameters.user_id + '/' + person.role + 's';
            return $http.post(url, person);
        }

        function getCourse(courseId) {
            var url = baseUrl + 'courses';
            if (courseId !== undefined && courseId !== null) {
                url = url + '/' + courseId;
            }

            return $http.get(url);
        }
    }
})();