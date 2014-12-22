(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataDeleteService', dataDeleteService);

    dataDeleteService.$inject = ['$q', 'logger', 'apiCaller'];

    /* @ngInject */
    function dataDeleteService($q, logger, apiCaller) {
        var service = {
            deleteAssignment: deleteAssignment,
            deleteExam: deleteExam,
            deleteLecture: deleteLecture,
            deleteNotice: deleteNotice,
        };

        return service;

        function deleteAssignment(courseId, assignment) {
            return $q(function (resolve, revoke) {
                apiCaller.deleteAssignment(courseId, assignment).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function deleteExam(courseId, exam) {
            return $q(function (resolve, revoke) {
                apiCaller.deleteExam(courseId, exam).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function deleteLecture(lecture) {
            logger.info('Successfully deleted lecture ' + lecture.name);
            return $q.when({
                is_valid: true
            });
        }

        function deleteNotice(notice) {
            logger.info('Successfully deleted notice ' + notice.name);
            return $q.when({
                is_valid: true
            });
        }
    }
})();