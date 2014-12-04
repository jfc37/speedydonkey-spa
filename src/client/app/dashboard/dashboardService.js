(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('dashboardService', dashboardService);

    dashboardService.$inject = ['$q', 'dataservice', 'myCoursesService', 'logger'];

    /* @ngInject */
    function dashboardService($q, dataservice, myCoursesService, logger) {
        /*jshint validthis: true */
        
        var service = {
            loadEnroledCourses: loadEnroledCourses,
            getCourseNotices: getCourseNotices
        };

        var loadedCourses;

        function loadEnroledCourses() {
            return $q(function (resolve, revoke) {
                myCoursesService.getCourses().then(function (courses) {
                    //Do a search where course id in courses
                    loadedCourses = courses;
                    resolve();
                }, revoke);
            });
        }

        function getCourseNotices() {
            return $q(function (resolve, revoke) {
                var allNotices = [];
                loadedCourses.forEach(function (course) {
                    Array.prototype.push.apply(allNotices, course.notices);
                });
                resolve(allNotices);
            }); 
        }

        return service;
    }
})();
