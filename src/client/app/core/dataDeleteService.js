(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataDeleteService', dataDeleteService);

    dataDeleteService.$inject = ['$q', 'logger'];

    /* @ngInject */
    function dataDeleteService($q, logger) {
        var service = {
            deleteAssignment: deleteAssignment,
            deleteExam: deleteExam,
        };

        return service;

        function deleteAssignment(assignment) {
            logger.info('Successfully deleted assignment ' + assignment.name);
            return $q.when({
                is_valid: true
            });
        }

        function deleteExam(exam) {
            logger.info('Successfully deleted exam ' + exam.name);
            return $q.when({
                is_valid: true
            });
        }
    }
})();