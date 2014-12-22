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

            postAssignment: postAssignment,
            putAssignment: putAssignment,
            deleteAssignment: deleteAssignment,

            postExam: postExam,
            putExam: putExam,
            deleteExam: deleteExam,

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

        function postCourse(personId, course) {
            var url = baseUrl + 'professors/' + personId  + '/courses';
            return $http.post(url, course);
        }

        function putCourse(course) {
            var url = baseUrl + 'courses/' + course.id;
            return $http.put(url, course);
        }

        function postAssignment(courseId, assignment) {
            var url = baseUrl + 'courses/' + courseId + '/assignments';
            return $http.post(url, assignment);
        }

        function putAssignment(courseId, assignment) {
            var url = baseUrl + 'courses/' + courseId + '/assignments/' + assignment.id;
            return $http.put(url, assignment);
        }

        function deleteAssignment(courseId, assignment) {
            var url = baseUrl + 'courses/' + courseId + '/assignments/' + assignment.id;
            return $http.delete(url, assignment);
        }

        function postExam(courseId, exam) {
            var url = baseUrl + 'courses/' + courseId + '/exams';
            return $http.post(url, exam);
        }

        function putExam(courseId, exam) {
            var url = baseUrl + 'courses/' + courseId + '/exams/' + exam.id;
            return $http.put(url, exam);
        }

        function deleteExam(courseId, exam) {
            var url = baseUrl + 'courses/' + courseId + '/exams/' + exam.id;
            return $http.delete(url, exam);
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