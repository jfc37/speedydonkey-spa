(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataUpdateService', dataUpdateService);

    dataUpdateService.$inject = ['$q', 'apiCaller'];

    /* @ngInject */
    function dataUpdateService($q, apiCaller) {
        var service = {
            enrolInBlock: enrolInBlock,
            studentAttendedClass: studentAttendedClass,
            assignPassToStudent: assignPassToStudent
        };

        return service;

        function enrolInBlock(enrolment) {
            return $q(function (resolve, revoke) {
                apiCaller.postBlockEnrolment(enrolment).then(function(response) {
                    resolve();
                }, function () {
                    revoke();
                });
            });
        }

        function studentAttendedClass(classId, studentId) {
            return $q(function (resolve, revoke) {
                apiCaller.postClassAttendance(classId, studentId).then(resolve, revoke);
            });
        }

        function assignPassToStudent(studentId, pass) {
            return $q(function (resolve, revoke) {
                apiCaller.postPassAssignment(studentId, pass).then(resolve, revoke);
            });
        }
    }
})();