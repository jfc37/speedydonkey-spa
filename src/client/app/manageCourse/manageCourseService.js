(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .factory('manageCourseService', manageCourseService);

    manageCourseService.$inject = ['$q', '$routeParams', 'dataservice', 'dataUpdateService', 'dataCreateService', 'dataDeleteService', 'logger'];

    /* @ngInject */
    function manageCourseService($q, $routeParams, dataservice, dataUpdateService, dataCreateService, dataDeleteService, logger) {
        /*jshint validthis: true */
        var service = {
            getCourse: getCourse
        };

        function getCourse(courseName) {
            return $q(function (resolve, revoke) {
                dataservice.searchForCourse({name: courseName}, {assignments: true, exams: true, lectures: true, notices: true}).then(function (courses) {
                    return resolve(courses[0]);
                }, revoke);
            });
        }

        return service;
    }
})();