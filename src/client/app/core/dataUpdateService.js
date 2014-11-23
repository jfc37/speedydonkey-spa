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

        function enrolInCourse(parameters, success, error) {
            apiCaller.postCourseEnrolment(parameters)
                .success(function (response) {
                    if (response.validation_result.is_valid) {
                        success();
                    } else {
                        error();
                    }
                })
                .error(error);
        }

        function unenrolInCourse(parameters, success, error) {
            apiCaller.deleteCourseEnrolment(parameters)
                .success(function (response) {
                    success();
                })
                .error(error);
        }

        function updateCourse(course) {
            logger.info('Successfully updated course ' + course.name);
            return $q.when({
                is_valid: true
            })
        }

        function updateAssignment(assignment) {
            logger.info('Successfully updated assignment ' + assignment.name);
            return $q.when({
                is_valid: true
            })
        }

        function updateExam(exam) {
            logger.info('Successfully updated exam ' + exam.name);
            return $q.when({
                is_valid: true
            })
        }

        function updateLecture(lecture) {
            logger.info('Successfully updated lecture ' + lecture.name);
            return $q.when({
                is_valid: true
            })
        }

        function updateNotice(notice) {
            logger.info('Successfully updated notice ' + notice.name);
            return $q.when({
                is_valid: true
            })
        }
    }
})();