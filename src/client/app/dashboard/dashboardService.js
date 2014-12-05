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

        var loadedCourses = [];

        function loadEnroledCourses() {
            return $q(function (resolve, revoke) {
                var promises = [];
                myCoursesService.getCourses().then(function (courses) {
                    courses.forEach(function (course) {
                        promises.push(dataservice.getCourse(course.id).then(function (course) {
                            loadedCourses.push(course);
                        }));
                    });
                    $q.all(promises).then(function () {
                        resolve(loadedCourses);
                    });
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
