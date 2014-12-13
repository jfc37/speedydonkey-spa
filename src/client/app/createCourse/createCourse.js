(function () {
    'use strict';

    angular
        .module('app.createCourse')
        .controller('CreateCourse', CreateCourse);

    CreateCourse.$inject = ['createCourseService', 'logger', 'routehelper', 'validationService'];

    /* @ngInject */
    function CreateCourse(createCourseService, logger, routehelper, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.course = {};
        vm.title = "Create Course";
        vm.gradeTypes = [
            {
                display: 'Letter',
                value: 'Letter'
            },
            {
                display: 'Percentage',
                value: 'Percentage'
            },
        ];
        
        logger.info('Activated ' + vm.title + ' View');

        vm.createCourse = function(form) {
            createCourseService.createCourse(vm.course).then(function (course) {
                routehelper.redirectToRoute('manageCourse', {courseName: course.name});
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
                logger.error("Problem creating course");
            });
        };
    }
})();