(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('apiCaller', apiCaller);

    apiCaller.$inject = ['$http', 'config'];

    /* @ngInject */
    function apiCaller($http, config) {
        var service = {

            postUserActivation: postUserActivation,
            postUserPasswordReset: postUserPasswordReset,
            putUserPasswordReset: putUserPasswordReset,

            postUser: postUser,
            putCurrentUser: putCurrentUser,
            getUser: getUser,
            getUsers: getUsers,
            searchUser: searchUser,
            getCurrentUser: getCurrentUser,
            deleteUser: deleteUser,

            getCurrentUserSchedule: getCurrentUserSchedule,
            getUserCurrentPasses: getUserCurrentPasses,
            getUserEnroledBlocks: getUserEnroledBlocks,
            getCurrentUserClaims: getCurrentUserClaims,
            getCurrentUserAnnouncements: getCurrentUserAnnouncements,

            postPassAssignment: postPassAssignment,
            postCurrentUserPassAssignment: postCurrentUserPassAssignment,

            getBlock: getBlock,
            searchBlock: searchBlock,
            postBlockEnrolment: postBlockEnrolment,

            searchReferenceData: searchReferenceData,

            getClassRegisteredStudents: getClassRegisteredStudents,
            getClassAttendance: getClassAttendance,
            postClassAttendance: postClassAttendance,
            deleteClassAttendance: deleteClassAttendance,

            putPass: putPass,
            deletePass: deletePass,

            postPassOption: postPassOption,
            getPassOption: getPassOption,
            deletePassOption: deletePassOption,
            putPassOption: putPassOption,

            postLevel: postLevel,
            putLevel: putLevel,
            getLevel: getLevel,
            deleteLevel: deleteLevel,

            postBlock: postBlock,
            putBlock: putBlock,
            deleteBlock: deleteBlock,

            getClass: getClass,
            searchClass: searchClass,
            putClass: putClass,
            deleteClass: deleteClass,

            postTeacher: postTeacher,
            getTeacher: getTeacher,
            deleteTeacher: deleteTeacher,

            getProfitReport: getProfitReport,

            getAnnouncements: getAnnouncements,
            postAnnouncement: postAnnouncement,
            deleteAnnouncement: deleteAnnouncement,

            putNote: putNote,

            beginExpressCheckout: beginExpressCheckout,
            confirmExpressCheckout: confirmExpressCheckout,
            completeExpressCheckout: completeExpressCheckout
        };
        var baseUrl = 'https://' + config.apiUrl + '/api/';

        return service;

        function postUserActivation(key) {
            var url = baseUrl + 'users/activation/' + key;
            return $http.post(url);
        }

        function postUserPasswordReset(email) {
            var url = baseUrl + 'users/password/reset';
            return $http.post(url, {
                email: email
            });
        }

        function putUserPasswordReset(key, password) {
            var url = baseUrl + 'users/password/reset/' + key;
            return $http.put(url, {
                password: password
            });
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

        function getUsers() {
            var url = baseUrl + 'users';
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

        function deleteUser(userId) {
            var url = baseUrl + 'users/' + userId;
            return $http.delete(url);
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

        function getCurrentUserAnnouncements() {
            var url = baseUrl + 'users/current/announcements';
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

        function searchBlock(search) {
            var url = baseUrl + 'blocks?q=' + search;

            return $http.get(url, {
                cache: true
            });
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

        function deletePass(id) {
            var url = baseUrl + 'passes/' + id;
            return $http.delete(url);
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

        function putLevel(level) {
            var url = baseUrl + 'levels/' + level.id;
            return $http.put(url, level);
        }

        function getLevel() {
            var url = baseUrl + 'levels';
            return $http.get(url);
        }

        function deleteLevel(id) {
            var url = baseUrl + 'levels/' + id;
            return $http.delete(url);
        }

        function postBlock(levelId) {
            var url = baseUrl + 'levels/' + levelId + '/blocks';
            return $http.post(url);
        }

        function putBlock(block) {
            var url = baseUrl + 'blocks/' + block.id;
            return $http.put(url, block);
        }

        function deleteBlock(id) {
            var url = baseUrl + 'blocks/' + id;
            return $http.delete(url);
        }

        function putClass(theClass) {
            var url = baseUrl + 'classes/' + theClass.id;
            return $http.put(url, theClass);
        }

        function deleteClass(id) {
            var url = baseUrl + 'classes/' + id;
            return $http.delete(url);
        }

        function postTeacher(userId) {
            var url = baseUrl + 'teachers/' + userId;
            return $http.post(url);
        }

        function getTeacher() {
            var url = baseUrl + 'teachers';
            return $http.get(url, {
                cache: true
            });
        }

        function deleteTeacher(userId) {
            var url = baseUrl + 'teachers/' + userId;
            return $http.delete(url);
        }

        function getProfitReport(starting, ending) {
            var url = baseUrl + 'report/profit?from=' + starting + '&to=' + ending;
            return $http.get(url);
        }

        function getAnnouncements() {
            var url = baseUrl + 'announcements';
            return $http.get(url);
        }

        function postAnnouncement(announcement) {
            var url = baseUrl + 'announcements';
            return $http.post(url, announcement);
        }

        function deleteAnnouncement(id) {
            var url = baseUrl + 'announcements/' + id;
            return $http.delete(url);
        }

        function putNote(options) {
            var url = baseUrl + options.type + '/' + options.id + '/notes';
            return $http.put(url, '\'' + options.note + '\'');
        }

        function beginExpressCheckout(options) {
            var url = baseUrl + 'paypal/begin';
            return $http.post(url, options);
        }

        function confirmExpressCheckout(token) {
            var url = baseUrl + 'paypal/confirm';
            return $http.post(url, token);
        }

        function completeExpressCheckout(token) {
            var url = baseUrl + 'paypal/complete';
            return $http.post(url, token);
        }
    }
})();