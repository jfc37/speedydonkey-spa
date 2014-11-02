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
            unenrolInCourse: unenrolInCourse
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
    }
})();