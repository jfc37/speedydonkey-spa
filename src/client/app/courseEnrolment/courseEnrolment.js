(function () {
    'use strict';

    angular
        .module('app.courseEnrolment')
        .controller('CourseEnrolment', CourseEnrolment);

    CourseEnrolment.$inject = ['$q', 'dataservice', 'dataUpdateService', 'logger', 'authService'];

    /* @ngInject */
    function CourseEnrolment($q, dataservice, dataUpdateService, logger, authService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Course Enrolment';
        vm.courses = [];

        vm.updateEnrolment = function(course) {
            if (course.isEnroled){
                dataUpdateService.enrolInCourse({personId: authService.getUserIdentity().personId, courseId: course.id}, function () {
                    logger.info('Successfully enroled in ' + course.name);
                }, function () {
                    logger.error('Problem enroling in ' + course.name);
                });
            } else {
                dataUpdateService.unenrolInCourse({personId: authService.getUserIdentity().personId, courseId: course.id}, function () {
                    logger.info('Successfully unenroled in ' + course.name);
                }, function () {
                    logger.error('Problem unenroling in ' + course.name);
                });
            }
        }

        activate();

        function activate() {
            return $q.all([getAllCourses()])
            .then($q.all([getEnroledCourses()]))
            .then(function(){
                logger.info('Activated Course Enrolment View');
            });
        }

        function getEnroledCourses() {
            return dataservice.getStudent(authService.getUserIdentity().personId, function (student) {
                var enroledCourseNames = student.enroled_courses.map(function(course){
                    return course.name;
                });
                vm.courses.forEach(function(course){
                    if (enroledCourseNames.indexOf(course.name) !== -1){
                        course.isEnroled = true;
                    }
                });
            }, function () {
                logger.error('Problem getting enroled courses');
            });
        }

        function getAllCourses() {
            return dataservice.getAllCourses(function(data) {
                data.forEach(function(course){
                    course.isEnroled = false;
                });

                vm.courses = data;
                return vm.courses;
            }, function(data) {
                logger.error('Problem getting all available courses');
            });
        }
    }
})();