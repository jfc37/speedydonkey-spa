(function () {
    'use strict';

    angular
        .module('app.courseEnrolment')
        .controller('CourseEnrolment', CourseEnrolment);

    CourseEnrolment.$inject = ['courseEnrolmentService', '$q', 'dataservice', 'dataUpdateService', 'logger', 'authService'];

    /* @ngInject */
    function CourseEnrolment(courseEnrolmentService, $q, dataservice, dataUpdateService, logger, authService) {
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
            .then(function(){
                logger.info('Activated Course Enrolment View');
            });
        }

        function getAllCourses() {
            return courseEnrolmentService.getCourses().then(function (courses) {
                vm.courses = courses;
            }, function (){
                logger.error("Issue getting courses...");
            })
        }
    }
})();