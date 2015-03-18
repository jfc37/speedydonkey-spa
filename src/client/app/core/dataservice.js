(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q', 'apiCaller', 'dateService'];

    /* @ngInject */
    function dataservice($q, apiCaller, dateService) {
        var service = {

            getUser: getUser,
            searchForUser: searchForUser,

            getUserSchedule: getUserSchedule,
            getUserCurrentPasses: getUserCurrentPasses,
            getUserEnroledBlocks: getUserEnroledBlocks,

            getAllBlocks: getAllBlocks,

            getAllPassOptions: getAllPassOptions
        };

        return service;

        function getUser(userId) {
            return $q(function (resolve, revoke) {
                apiCaller.getUser(userId).then(function (response) {
                    resolve(response.data);
                }, revoke);
            });
        }

        function searchForUser(searchParameters) {

            var q = '';
            for (var prop in searchParameters) {
                if (searchParameters.hasOwnProperty(prop)) {
                    q = q + '&' + prop + '_=_' + searchParameters[prop];
                }
            }
            q = q.slice(1);

            return apiCaller.searchUser(q);
        }

        function getUserSchedule(userId) {
            return $q(function (resolve, reject) {
                apiCaller.getUserSchedule(userId).then(function (response) {
                    resolve(response.data);   
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getUserCurrentPasses(userId) {
            return $q(function (resolve, reject) {
                apiCaller.getUserCurrentPasses(userId).then(function (response) {
                    resolve(response.data);   
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getUserEnroledBlocks(userId) {
            return $q(function (resolve, reject) {
                apiCaller.getUserEnroledBlocks(userId).then(function (response) {
                    resolve(response.data);   
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllBlocks() {
            return $q(function (resolve, reject) {
                apiCaller.getBlock().then(function (response) {
                    resolve(response.data);   
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllPassOptions() {
            return $q(function (resolve, reject) {
                var query = 'type_=_PassOption';
                apiCaller.searchReferenceData(query).then(function (response) {
                    resolve(response.data);   
                }, function (response) {
                    reject(response);
                });
            });
        }
    }
})();