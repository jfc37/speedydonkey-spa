(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataUpdateService', dataUpdateService);

    dataUpdateService.$inject = ['$q', 'logger'];

    /* @ngInject */
    function dataUpdateService($q, logger) {
        var service = {
            enrolInCourse: enrolInCourse,
            unenrolInCourse: unenrolInCourse,
            updateCourse: updateCourse,
            updateExam: updateExam,
            updateLecture: updateLecture,
        };

        return service;

        function enrolInCourse(course) {
            logger.info('Successfully enroled in ' + course.name);
            return true;
        }

        function unenrolInCourse(course) {
            logger.info('Successfully unenroled in ' + course.name);
            return true;
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
    }
})();