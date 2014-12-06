(function () {
    'use strict';

    angular
        .module('app.createCourse')
        .controller('CreateCourse', CreateCourse);

    CreateCourse.$inject = ['createCourseService', 'logger', 'routehelper'];

    /* @ngInject */
    function CreateCourse(createCourseService, logger, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.course = {};
        vm.title = "Create Course";
        
        logger.info('Activated ' + vm.title + ' View');

        vm.createCourse = function() {
            createCourseService.createCourse(vm.course).then(function (course) {
                routehelper.redirectToRoute('manageCourse', {courseName: course.name});
            }, function () {
                logger.error("Problem creating course");
            });
        };
    }
})();