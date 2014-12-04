(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('courseEnrolmentService', courseEnrolmentService);

    courseEnrolmentService.$inject = ['$q', 'logger', 'dataservice', 'authService'];

    /* @ngInject */
    function courseEnrolmentService($q, logger, dataservice, authService){

        var service = {
            getCourses : getCourses
        };

        function getCourses() {
            return $q(function (resolve, reject) {
                var allCourses;
                dataservice.getAllCourses().then(function(courses) {
                    courses.forEach(function(course){
                        course.isEnroled = false;
                    });

                    allCourses = courses;
                }, reject).then(function () {
                    dataservice.getStudent(authService.getUserIdentity().personId).then(function (student) {
                        var enroledCourseNames = student.enroled_courses.map(function(course){
                            return course.name;
                        });
                        allCourses.forEach(function(course){
                            if (enroledCourseNames.indexOf(course.name) !== -1){
                                course.isEnroled = true;
                            }
                        });
                    }, reject);
                }).then(function () {
                    resolve(allCourses)
                });
            });
        }

        return service;

    }
})();