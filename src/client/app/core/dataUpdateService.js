(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataUpdateService', dataUpdateService);

    dataUpdateService.$inject = ['$q', 'apiCaller'];

    /* @ngInject */
    function dataUpdateService($q, apiCaller) {
        var service = {
            activateUser: activateUser,

            enrolInBlock: enrolInBlock,
            studentAttendedClass: studentAttendedClass,
            assignPassToStudent: assignPassToStudent,

            updatePass: updatePass
        };

        return service;

        function activateUser(key) {
            return $q(function (resolve, revoke) {
                apiCaller.postUserActivation(key).then(function(response) {
                    resolve();
                }, function () {
                    revoke();
                });
            });
        }

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

        function updatePass(pass) {
            return $q(function (resolve, revoke) {
                apiCaller.putPass(pass).then(resolve, revoke);
            });
        }
    }
})();