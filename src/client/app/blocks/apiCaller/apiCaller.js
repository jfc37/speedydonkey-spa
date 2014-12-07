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
            getPerson : getPerson,

            getCourse : getCourse,
            searchCourse: searchCourse,
            postCourse: postCourse,
            putCourse: putCourse,

            postCourseEnrolment: postCourseEnrolment,
            deleteCourseEnrolment: deleteCourseEnrolment
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

        function getPerson(parameters) {
            var url = baseUrl + parameters.role + 's';
            if (parameters.personId !== undefined && parameters.personId !== null) {
                url = url + '/' + parameters.personId;
            }

            return $http.get(url);
        }

        function getCourse(courseId) {
            var url = baseUrl + 'courses';
            if (courseId !== undefined && courseId !== null) {
                url = url + '/' + courseId;
            }

            return $http.get(url);
        }

        function searchCourse(search) {
            var url = baseUrl + 'courses?q=' + search;
            return $http.get(url);
        }

        function postCourse(course) {
            var url = baseUrl + 'courses';
            return $http.post(url, course);
        }

        function putCourse(course) {
            var url = baseUrl + 'courses';
            return $http.put(url, course);
        }

        function postCourseEnrolment(parameters) {
            var url = baseUrl + 'students/' + parameters.personId + '/courses/' + parameters.courseId;
            return $http.post(url);
        }

        function deleteCourseEnrolment(parameters) {
            var url = baseUrl + 'students/' + parameters.personId + '/courses/' + parameters.courseId;
            return $http.delete(url);
        }
    }
})();