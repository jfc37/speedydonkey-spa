(function () {
    'use strict';

    angular
        .module('app.courseEnrolment')
        .controller('CourseEnrolment', CourseEnrolment);

    CourseEnrolment.$inject = ['courseEnrolmentService', '$q', 'logger'];

    /* @ngInject */
    function CourseEnrolment(courseEnrolmentService, $q, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Course Enrolment';
        vm.courses = [];

        vm.updateEnrolment = function(course) {
            courseEnrolmentService.updateEnrolment(course).then(function (){
                logger.success("Updated enrolment");
            }, function () {
                logger.error("Problem with enrolment");
            });
        };

        activate();

        function activate() {
            return $q(getAllCourses)
            .then(function(){
                logger.info('Activated Course Enrolment View');
            });
        }

        function getAllCourses() {
            return courseEnrolmentService.getCourses().then(function (courses) {
                vm.courses = courses;
            }, function (){
                logger.error("Issue getting courses...");
            });
        }
    }
})();