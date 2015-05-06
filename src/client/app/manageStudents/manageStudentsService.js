(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .factory('manageStudentsService', manageStudentsService);

    manageStudentsService.$inject = ['$q', 'logger', 'dataservice', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function manageStudentsService($q, logger, dataservice, dataCreateService, dataDeleteService){

        var service = {
            deleteStudent: deleteStudent,
            getStudents: getStudents
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

        return service;

    }
})();