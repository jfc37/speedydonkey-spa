(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .factory('manageStudentsService', manageStudentsService)
        .factory('managePassesService', managePassesService);

    /* @ngInject */
    function manageStudentsService($q, logger, dataservice, dataCreateService, dataDeleteService) {

        var service = {
            deleteStudent: deleteStudent,
            getStudents: getStudents,
            getStudentInfo: getStudentInfo,
            deletePass: deletePass
        };

        function deleteStudent(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteUser(id).then(resolve, revoke);
            });
        }

        function getStudents() {
            return $q(function (resolve, revoke) {
                dataservice.getAllUsers().then(function (students) {
                    resolve(students);
                }, revoke);
            });
        }

        function getStudentInfo(id) {
            return $q(function (resolve, revoke) {
                dataservice.getUserCurrentPasses(id).then(function (passes) {
                    resolve({
                        passes: passes
                    });
                }, function () {
                    resolve({
                        passes: []
                    });
                });
            });
        }

        function deletePass(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deletePass(id).then(resolve, revoke);
            });
        }

        return service;

    }

    managePassesService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'dataDeleteService'];

    /* @ngInject */
    function managePassesService($q, logger, dataservice, dataUpdateService, dataDeleteService) {

        var service = {
            deletePass: deletePass,
            updatePass: updatePass
        };

        function deletePass(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deletePass(id).then(resolve, revoke);
            });
        }

        function updatePass(pass) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updatePass(pass).then(resolve, revoke);
            });
        }

        return service;

    }
})();
