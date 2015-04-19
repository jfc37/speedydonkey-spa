(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('apiCaller', apiCaller);

    apiCaller.$inject = ['$http'];

    /* @ngInject */
    function apiCaller($http) {
        var service = {

            postUserActivation: postUserActivation,
            postUserPasswordReset: postUserPasswordReset,
            putUserPasswordReset: putUserPasswordReset,

            postUser : postUser,
            putCurrentUser: putCurrentUser,
            getUser: getUser,
            searchUser: searchUser,
            getCurrentUser: getCurrentUser,

            getCurrentUserSchedule: getCurrentUserSchedule,
            getUserCurrentPasses: getUserCurrentPasses,
            getUserEnroledBlocks: getUserEnroledBlocks,
            getCurrentUserClaims: getCurrentUserClaims,

            postPassAssignment: postPassAssignment,
            postCurrentUserPassAssignment: postCurrentUserPassAssignment,

            getBlock : getBlock,
            postBlockEnrolment: postBlockEnrolment,

            searchReferenceData: searchReferenceData,

            getClass: getClass,
            searchClass: searchClass,
            getClassRegisteredStudents: getClassRegisteredStudents,
            getClassAttendance: getClassAttendance,
            postClassAttendance: postClassAttendance,
            deleteClassAttendance: deleteClassAttendance,

            putPass: putPass,

            postPassOption: postPassOption,
            getPassOption: getPassOption,
            deletePassOption: deletePassOption,
            putPassOption: putPassOption,

            postLevel: postLevel,
            getLevel: getLevel
        };
        var baseUrl;

        function getBaseUrl() {
            $http.get('/apiUrl').then(function(response) {
                baseUrl = 'https://' + response.data + '/api/';
            });
        }

        getBaseUrl();

        return service;

        function postUserActivation(key) {
            var url = baseUrl + 'users/activation/' + key;
            return $http.post(url);
        }

        function postUserPasswordReset(email) {
            var url = baseUrl + 'users/password/reset';
            return $http.post(url, {email: email});
        }

        function putUserPasswordReset(key, password) {
            var url = baseUrl + 'users/password/reset/' + key;
            return $http.put(url, {password: password});
        }

        function postUser(user) {
            var url = baseUrl + 'users';
            return $http.post(url, user);
        }

        function putCurrentUser(user) {
            var url = baseUrl + 'users/current';
            return $http.put(url, user);
        }

        function getUser(userId) {
            var url = baseUrl + 'users/' + userId;
            return $http.get(url);
        }

        function searchUser(search) {
            var url = baseUrl + 'users?q=' + search;

            return $http.get(url);
        }

        function getCurrentUser() {
            var url = baseUrl + 'users/current';
            return $http.get(url);
        }

        function getCurrentUserSchedule() {
            var url = baseUrl + 'users/current/schedules';
            return $http.get(url);
        }

        function getUserCurrentPasses(userId) {
            var url = baseUrl + 'users/' + userId + '/passes';
            return $http.get(url);
        }

        function getUserEnroledBlocks(userId) {
            var url = baseUrl + 'users/current/blocks';
            return $http.get(url);
        }

        function getCurrentUserClaims() {
            var url = baseUrl + 'users/current/claims';
            return $http.get(url);
        }

        function postPassAssignment(userId, passOptionId, pass) {
            var url = baseUrl + 'users/' + userId + '/passtemplates/' + passOptionId;
            return $http.post(url, pass);
        }

        function postCurrentUserPassAssignment(passOptionId, pass) {
            var url = baseUrl + 'users/current/passtemplates/' + passOptionId;
            return $http.post(url, pass);
        }

        function getBlock(blockId) {
            var url = baseUrl + 'blocks';
            if (blockId !== undefined && blockId !== null) {
                url = url + '/' + blockId;
            }

            return $http.get(url);
        }
        
        function postBlockEnrolment(enrolment) {
            var url = baseUrl + 'users/' + enrolment.user_id + '/enrolment';
            return $http.post(url, enrolment);
        }

        function searchReferenceData(search) {
            var url = baseUrl + 'reference?q=' + search;

            return $http.get(url);
        }

        function getClass(id) {
            var url = baseUrl + 'classes/' + id;
            return $http.get(url);
        }

        function searchClass(search) {
            var url = baseUrl + 'classes?q=' + search;

            return $http.get(url);
        }

        function getClassRegisteredStudents(id) {
            var url = baseUrl + 'classes/' + id + '/roll';
            return $http.get(url);
        }

        function getClassAttendance(id) {
            var url = baseUrl + 'classes/' + id + '/attendance';
            return $http.get(url);
        }
        
        function postClassAttendance(classId, studentId) {
            var url = baseUrl + 'classes/' + classId + '/attendance/' + studentId;
            return $http.post(url);
        }
        
        function deleteClassAttendance(classId, studentId) {
            var url = baseUrl + 'classes/' + classId + '/attendance/' + studentId;
            return $http.delete(url);
        }
        
        function putPass(pass) {
            var url = baseUrl + 'passes/' + pass.id;
            return $http.put(url, pass);
        }

        function postPassOption(passOption) {
            var url = baseUrl + 'passtemplate';
            return $http.post(url, passOption);
        }

        function getPassOption() {
            var url = baseUrl + 'passtemplate';
            return $http.get(url);
        }

        function deletePassOption(id) {
            var url = baseUrl + 'passtemplate/' + id;
            return $http.delete(url);
        }

        function putPassOption(passOption) {
            var url = baseUrl + 'passtemplate/' + passOption.id;
            return $http.put(url, passOption);
        }

        function postLevel(level) {
            var url = baseUrl + 'levels';
            return $http.post(url, level);
        }

        function getLevel() {
            var url = baseUrl + 'levels';
            return $http.get(url);
        }
    }
})();
