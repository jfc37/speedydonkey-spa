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

            getBlock : getBlock,
            postBlockEnrolment: postBlockEnrolment,

            searchReferenceData: searchReferenceData
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

        function getBlock(blockId) {
            var url = baseUrl + 'blocks';
            if (blockId !== undefined && blockId !== null) {
                url = url + '/' + blockId;
            }

            return $http.get(url);
        }
        
        function postBlockEnrolment(parameters) {
            var url = baseUrl + 'users/' + parameters.userId + '/blocks/' + parameters.blockId;
            return $http.post(url);
        }

        function searchReferenceData(search) {
            var url = baseUrl + 'reference?q=' + search;

            return $http.get(url);
        }


    }
})();