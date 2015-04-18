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
            deletePassOption: deletePassOption
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

        return service;
    }
})();