(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataCreateService', dataCreateService);

    dataCreateService.$inject = ['$q', 'apiCaller', 'authService', 'dateService'];

    /* @ngInject */
    function dataCreateService($q, apiCaller, authService, dateService) {
        var service = {
            createUser: createUser,
            createPassOption: createPassOption,
            createLevel: createLevel,
            createBlock: createBlock,
            createTeacher: createTeacher,
            createAnnouncement: createAnnouncement
        };

        return service;

        function createUser(user) {
            return $q(function (resolve, reject) {
                apiCaller.postUser(user).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    reject(response);
                });
            });
        }

        function createPassOption(passOption) {
            return $q(function (resolve, reject) {
                apiCaller.postPassOption(passOption).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    reject(response);
                });
            });
        }

        function createLevel(level) {
            return $q(function (resolve, reject) {
                apiCaller.postLevel(level).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    reject(response);
                });
            });
        }

        function createBlock(levelId) {
            return $q(function (resolve, reject) {
                apiCaller.postBlock(levelId).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    reject(response);
                });
            });
        }

        function createTeacher(userId) {
            return $q(function (resolve, reject) {
                apiCaller.postTeacher(userId).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    reject(response);
                });
            });
        }

        function createAnnouncement(announcement) {
            return $q(function (resolve, reject) {
                apiCaller.postAnnouncement(announcement).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    reject(response);
                });
            });
        }
    }
})();
