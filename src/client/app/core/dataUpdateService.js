(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataUpdateService', dataUpdateService);

    dataUpdateService.$inject = ['$q', 'logger', 'apiCaller'];

    /* @ngInject */
    function dataUpdateService($q, logger, apiCaller) {
        var service = {
            enrolInCourse: enrolInCourse,
            unenrolInCourse: unenrolInCourse,
            updateCourse: updateCourse,
            updateAssignment: updateAssignment,
            updateExam: updateExam,
            updateNotice: updateNotice,
            updateLecture: updateLecture,
        };

        return service;

        function enrolInCourse(parameters) {
            return $q(function (resolve, revoke) {
                apiCaller.postCourseEnrolment(parameters).then(function(response) {
                    resolve();
                }, function () {
                    revoke();
                });
            });
        }

        function unenrolInCourse(parameters) {
            return $q(function (resolve, revoke) {
                apiCaller.deleteCourseEnrolment(parameters).then(function(response) {
                    resolve();
                }, function () {
                    revoke();
                });
            });
        }

        function updateCourse(course) {
            return $q(function (resolve, revoke) {
                apiCaller.putCourse(course).success(function (response) {
                    resolve(response.data);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function updateAssignment(courseId, assignment) {
            return $q(function (resolve, revoke) {
                apiCaller.putAssignment(courseId, assignment).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function updateExam(courseId, exam) {
            return $q(function (resolve, revoke) {
                apiCaller.putExam(courseId, exam).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function updateNotice(courseId, notice) {
            return $q(function (resolve, revoke) {
                apiCaller.putNotice(courseId, notice).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function updateLecture(courseId, lecture) {
            return $q(function (resolve, revoke) {
                apiCaller.putLecture(courseId, lecture).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }
    }
})();