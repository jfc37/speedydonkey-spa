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
            getCurrentUser: getCurrentUser,
            getAllUsers: getAllUsers,

            getCurrentUserSchedule: getCurrentUserSchedule,
            getCurrentUserCurrentPasses: getCurrentUserCurrentPasses,
            getUserCurrentPasses: getUserCurrentPasses,
            getUserEnroledBlocks: getUserEnroledBlocks,
            getCurrentUserClaims: getCurrentUserClaims,

            getAllBlocks: getAllBlocks,
            getAllActiveBlocks: getAllActiveBlocks,

            getClass: getClass,
            searchForClasses: searchForClasses,
            getClassRegisteredStudents: getClassRegisteredStudents,
            getClassAttendance: getClassAttendance,

            getAllPassOptions: getAllPassOptions,

            getAllLevels: getAllLevels,

            getAllActiveClasses: getAllActiveClasses,

            getAllTeachers: getAllTeachers,

            getProfitReport: getProfitReport
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

        function getCurrentUser() {
            return $q(function (resolve, revoke) {
                apiCaller.getCurrentUser().then(function (response) {
                    resolve(response.data);
                }, revoke);
            });
        }

        function getAllUsers() {
            return $q(function (resolve, revoke) {
                apiCaller.getUsers().then(function (response) {
                    resolve(response.data);
                }, revoke);
            });
        }

        function getCurrentUserSchedule() {
            return $q(function (resolve, reject) {
                apiCaller.getCurrentUserSchedule().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getCurrentUserCurrentPasses() {
            return getUserCurrentPasses('current');
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

        function getUserEnroledBlocks() {
            return $q(function (resolve, reject) {
                apiCaller.getUserEnroledBlocks().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getCurrentUserClaims() {
            return $q(function (resolve, reject) {
                apiCaller.getCurrentUserClaims().then(function (response) {
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

        function getAllActiveBlocks() {
            return $q(function (resolve, reject) {
                var today = moment().format('YYYY-MM-DD');
                apiCaller.searchBlock('endDate_gt_' + today).then(function (response) {
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

        function getAllPassOptions() {
            return $q(function (resolve, reject) {
                apiCaller.getPassOption().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllLevels() {
            return $q(function (resolve, reject) {
                apiCaller.getLevel().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllActiveClasses() {
            return $q(function (resolve, reject) {
                var yesterday = moment().add('day', -1).format('YYYY-MM-DD');
                apiCaller.searchClass('endTime_gt_' + yesterday + ',take_10').then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllTeachers() {
            return $q(function (resolve, reject) {
                apiCaller.getTeacher().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getProfitReport(starting, ending) {
            return $q(function (resolve, reject) {
                apiCaller.getProfitReport(starting, ending).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }
    }
})();