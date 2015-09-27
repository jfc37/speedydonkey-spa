(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .factory('manageTeachersService', manageTeachersService);

    /* @ngInject */
    function manageTeachersService($q, logger, dataservice, dataCreateService, dataDeleteService) {

        var service = {
            addTeacher: addTeacher,
            deleteTeacher: deleteTeacher,
            getTeachers: getTeachers
        };

        function addTeacher(id) {
            return $q(function (resolve, revoke) {
                dataCreateService.createTeacher(id).then(function (createdTeacher) {
                    resolve(createdTeacher);
                }, function (response) {
                    if (response.validationResult !== undefined) {
                        revoke(response.validationResult.validationErrors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function deleteTeacher(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteTeacher(id).then(resolve, revoke);
            });
        }

        function getTeachers() {
            return $q(function (resolve, revoke) {
                dataservice.getAllTeachers().then(function (teachers) {
                    resolve(teachers);
                }, revoke);
            });
        }

        return service;

    }
})();
