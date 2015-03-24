(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('apiCaller', apiCaller);

    apiCaller.$inject = ['$http'];

    /* @ngInject */
    function apiCaller($http) {
        var service = {

            postUser : postUser,
            getUser: getUser,
            searchUser: searchUser,

            getUserSchedule: getUserSchedule,
            getUserCurrentPasses: getUserCurrentPasses,
            getUserEnroledBlocks: getUserEnroledBlocks,

            getBlock : getBlock,
            postBlockEnrolment: postBlockEnrolment,

            searchReferenceData: searchReferenceData,

            getClass: getClass,
            searchClass: searchClass,
            getClassRegisteredStudents: getClassRegisteredStudents
        };

        var baseUrl = 'http://api-speedydonkey.azurewebsites.net/api/';

        return service;


        function postUser(user) {
            var url = baseUrl + 'users';
            return $http.post(url, user);
        }

        function getUser(userId) {
            var url = baseUrl + 'users/' + userId;
            return $http.get(url);
        }

        function searchUser(search) {
            var url = baseUrl + 'users?q=' + search;

            return $http.get(url);
        }

        function getUserSchedule(userId) {
            var url = baseUrl + 'users/' + userId + '/schedules';
            return $http.get(url);
        }

        function getUserCurrentPasses(userId) {
            var url = baseUrl + 'users/' + userId + '/passes';
            return $http.get(url);
        }

        function getUserEnroledBlocks(userId) {
            var url = baseUrl + 'users/' + userId + '/blocks';
            return $http.get(url);
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
            var url = baseUrl + 'classes/' + id + '/registered_students';
            return $http.get(url);
        }


    }
})();