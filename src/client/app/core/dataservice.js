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
            searchForUserNew: searchForUserNew,

            getUserSchedule: getUserSchedule,
            getUserCurrentPasses: getUserCurrentPasses,
            getUserEnroledBlocks: getUserEnroledBlocks,

            getAllBlocks: getAllBlocks,

            getAllPassOptions: getAllPassOptions,

            getClass: getClass,
            searchForClasses: searchForClasses,
            getClassRegisteredStudents: getClassRegisteredStudents,
            getClassAttendance: getClassAttendance
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

        function searchForUserNew(searchParameters) {

            var q = '';
            searchParameters.forEach(function (search, index) {
                if (index > 0){
                    q = q + ',';
                }
                q = q + search.field + '_' + search.condition;
                if (search.value) {
                    q = q +  '_' + search.value;
                }
            });

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

        function getClass(id) {
            return $q(function (resolve, revoke) {
                apiCaller.getClass(id).then(function (response) {
                    resolve(response.data);
                }, revoke);
            });
        }

        function searchForClasses(searchParameters) {

            var q = '';
            searchParameters.forEach(function (search, index) {
                if (index > 0){
                    q = q + ',';
                }
                q = q + search.field + '_' + search.condition + '_' + search.value;
            });

            return apiCaller.searchClass(q);
        }

        function getClassRegisteredStudents(id) {
            return $q(function (resolve, reject) {
                apiCaller.getClassRegisteredStudents(id).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getClassAttendance(id) {
            return $q(function (resolve, reject) {
                apiCaller.getClassAttendance(id).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }
    }
})();