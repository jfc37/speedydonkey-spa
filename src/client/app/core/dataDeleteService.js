(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataDeleteService', dataDeleteService);

    dataDeleteService.$inject = ['$q', 'apiCaller'];

    /* @ngInject */
    function dataDeleteService($q, apiCaller) {
        var service = {
            studentUnattendedClass: studentUnattendedClass
        };

        function studentUnattendedClass(classId, studentId){

            return $q(function (resolve, revoke) {
                apiCaller.deleteClassAttendance(classId, studentId).then(resolve, revoke);
            });
        }

        return service;
    }
})();