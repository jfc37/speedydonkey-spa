(function () {
    'use strict';

    angular
        .module('app.courseEnrolment')
        .controller('CourseEnrolment', CourseEnrolment);

    CourseEnrolment.$inject = ['$q', 'dataservice', 'dataUpdateService', 'logger'];

    /* @ngInject */
    function CourseEnrolment($q, dataservice, dataUpdateService, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Course Enrolment';
        vm.courses = [];

        vm.updateEnrolment = function(course){
            if (course.isEnroled){
                dataUpdateService.enrolInCourse(course);
            } else {
                dataUpdateService.unenrolInCourse(course);
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
            return dataservice.getCourses().then(function (data) {
                var enroledCourseNames = data.map(function(course){
                    return course.name;
                });
                vm.courses.forEach(function(course){
                    if (enroledCourseNames.indexOf(course.name) !== -1){
                        course.isEnroled = true;
                    }
                });
            });
        }

        function getAllCourses() {
            return dataservice.getAllCourses().then(function (data) {
                data.forEach(function(course){
                    course.isEnroled = false;
                });

                vm.courses = data;
                return vm.courses;
            });
        }
    }
})();