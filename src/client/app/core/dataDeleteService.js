(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataDeleteService', dataDeleteService);

    dataDeleteService.$inject = ['$q', 'apiCaller'];

    /* @ngInject */
    function dataDeleteService($q, apiCaller) {
        var service = {
            studentUnattendedClass: studentUnattendedClass,
            deletePassOption: deletePassOption,
            deleteLevel: deleteLevel,
            deleteBlock: deleteBlock,
            deleteClass: deleteClass,
            deleteTeacher: deleteTeacher,
            deleteUser: deleteUser,
            deletePass: deletePass
        };

        function studentUnattendedClass(classId, studentId){

            return $q(function (resolve, revoke) {
                apiCaller.deleteClassAttendance(classId, studentId).then(resolve, revoke);
            });
        }

        function deletePassOption(id){
            return $q(function (resolve, revoke) {
                apiCaller.deletePassOption(id).then(resolve, revoke);
            });
        }

        function deleteLevel(id){
            return $q(function (resolve, revoke) {
                apiCaller.deleteLevel(id).then(resolve, revoke);
            });
        }

        function deleteBlock(id){
            return $q(function (resolve, revoke) {
                apiCaller.deleteBlock(id).then(resolve, revoke);
            });
        }

        function deleteClass(id){
            return $q(function (resolve, revoke) {
                apiCaller.deleteClass(id).then(resolve, revoke);
            });
        }

        function deleteTeacher(id){
            return $q(function (resolve, revoke) {
                apiCaller.deleteTeacher(id).then(resolve, revoke);
            });
        }

        function deleteUser(id){
            return $q(function (resolve, revoke) {
                apiCaller.deleteUser(id).then(resolve, revoke);
            });
        }

        function deletePass(id){
            return $q(function (resolve, revoke) {
                apiCaller.deletePass(id).then(resolve, revoke);
            });
        }

        return service;
    }
})();