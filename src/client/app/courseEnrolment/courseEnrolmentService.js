(function () {
    'use strict';

    angular
        .module('app.courseEnrolment')
        .factory('courseEnrolmentService', courseEnrolmentService);

    courseEnrolmentService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'authService'];

    /* @ngInject */
    function courseEnrolmentService($q, logger, dataservice, dataUpdateService, authService){

        var service = {
            getCourses : getCourses,
            updateEnrolment: updateEnrolment
        };

        function getCourses() {
            return $q(function (resolve, revoke) {
                var allCourses;
                dataservice.getAllCourses().then(function(courses) {
                    courses.forEach(function(course){
                        course.isEnroled = false;
                    });

                    allCourses = courses;
                }, revoke).then(function () {
                    dataservice.getStudent(authService.getUserIdentity().personId).then(function (student) {
                        var enroledCourseNames = student.enroled_courses.map(function(course){
                            return course.name;
                        });
                        allCourses.forEach(function(course){
                            if (enroledCourseNames.indexOf(course.name) !== -1){
                                course.isEnroled = true;
                            }
                        });
                    }, revoke);
                }).then(function () {
                    resolve(allCourses);
                });
            });
        }

        function updateEnrolment(course) {
            return $q(function (resolve, revoke) {
                if (course.isEnroled){
                    dataUpdateService.enrolInCourse({personId: authService.getUserIdentity().personId, courseId: course.id}).then(function () {
                        resolve();
                    }, function () {
                        revoke();
                    });
                } else {
                    dataUpdateService.unenrolInCourse({personId: authService.getUserIdentity().personId, courseId: course.id}).then(function () {
                        resolve();
                    }, function () {
                        revoke();
                    });
                }
            });
        }

        return service;

    }
})();