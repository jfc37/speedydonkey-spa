(function () {
    'use strict';

    angular
        .module('app.manageCourses')
        .factory('manageCoursesService', manageCoursesService);

    manageCoursesService.$inject = ['$q', 'dataservice', 'logger'];

    /* @ngInject */
    function manageCoursesService($q, dataservice, logger) {
        /*jshint validthis: true */
        var service = {
            getCourses: getCourses
        };

        function getCourses() {
            return $q(function (resolve, revoke) {
                dataservice.getAllCourses().then(function (courses) {
                    resolve(courses);
                }, revoke);
            });
        }

        return service;
    }
})();