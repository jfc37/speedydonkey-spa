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
            forgottenPassword: forgottenPassword,
            resetPassword: resetPassword,

            updateUser: updateUser,

            enrolInBlock: enrolInBlock,
            studentAttendedClass: studentAttendedClass,
            assignPassToStudent: assignPassToStudent,
            assignPassToCurrentUser: assignPassToCurrentUser,
            assignPrepurchasePassToCurrentUser: assignPrepurchasePassToCurrentUser,

            updatePass: updatePass,

            updatePassOption: updatePassOption,

            updateLevel: updateLevel,

            updateBlock: updateBlock,

            updateClass: updateClass
        };

        return service;

        function activateUser(key) {
            return $q(function (resolve, revoke) {
                apiCaller.postUserActivation(key).then(function (response) {
                    resolve();
                }, function () {
                    revoke();
                });
            });
        }

        function forgottenPassword(email) {
            return $q(function (resolve, revoke) {
                apiCaller.postUserPasswordReset(email).then(function (response) {
                    resolve();
                }, function () {
                    revoke();
                });
            });
        }

        function resetPassword(key, password) {
            return $q(function (resolve, revoke) {
                apiCaller.putUserPasswordReset(key, password).then(function (response) {
                    resolve();
                }, function (response) {
                    revoke(response.data.validation_errors);
                });
            });
        }

        function updateUser(user) {
            return $q(function (resolve, revoke) {
                apiCaller.putCurrentUser(user).then(function (response) {
                    resolve();
                }, function (response) {
                    revoke(response.data.validation_errors);
                });
            });
        }



        function enrolInBlock(enrolment) {
            return $q(function (resolve, revoke) {
                apiCaller.postBlockEnrolment(enrolment).then(function (response) {
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

        function assignPassToStudent(studentId, passOptionId, pass) {
            return $q(function (resolve, revoke) {
                apiCaller.postPassAssignment(studentId, passOptionId, pass).then(resolve, revoke);
            });
        }

        function assignPassToCurrentUser(passOptionId, pass) {
            return $q(function (resolve, revoke) {
                apiCaller.postCurrentUserPassAssignment(passOptionId, pass).then(resolve, revoke);
            });
        }

        function assignPrepurchasePassToCurrentUser(passOptionId, pass) {
            return $q(function (resolve, revoke) {
                apiCaller.postCurrentUserPrepurchasePass(passOptionId, pass).then(resolve, revoke);
            });
        }

        function updatePass(pass) {
            return $q(function (resolve, revoke) {
                apiCaller.putPass(pass).then(resolve, revoke);
            });
        }

        function updatePassOption(passOption) {
            return $q(function (resolve, revoke) {
                apiCaller.putPassOption(passOption).then(resolve, revoke);
            });
        }

        function updateLevel(level) {
            return $q(function (resolve, revoke) {
                apiCaller.putLevel(level).then(resolve, revoke);
            });
        }

        function updateBlock(block) {
            return $q(function (resolve, revoke) {
                apiCaller.putBlock(block).then(resolve, revoke);
            });
        }

        function updateClass(theClass) {
            return $q(function (resolve, revoke) {
                apiCaller.putClass(theClass).then(resolve, revoke);
            });
        }
    }
})();
