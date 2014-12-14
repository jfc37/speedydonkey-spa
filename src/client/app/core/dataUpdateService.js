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
            updateExam: updateExam,
            updateNotice: updateNotice,
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

        function updateAssignment(assignment) {
            logger.info('Successfully updated assignment ' + assignment.name);
            return $q.when({
                is_valid: true
            });
        }

        function updateExam(exam) {
            logger.info('Successfully updated exam ' + exam.name);
            return $q.when({
                is_valid: true
            });
        }

        function updateLecture(lecture) {
            logger.info('Successfully updated lecture ' + lecture.name);
            return $q.when({
                is_valid: true
            });
        }

        function updateNotice(notice) {
            logger.info('Successfully updated notice ' + notice.name);
            return $q.when({
                is_valid: true
            });
        }
    }
})();