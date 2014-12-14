(function () {
    'use strict';

    angular
        .module('app.createCourse')
        .controller('CreateCourse', CreateCourse);

    CreateCourse.$inject = ['createCourseService', 'logger', 'routehelper', 'validationService', 'selectOptionService'];

    /* @ngInject */
    function CreateCourse(createCourseService, logger, routehelper, validationService, selectOptionService) {
        /*jshint validthis: true */
        var vm = this;

        vm.course = {};
        vm.title = "Create Course";
        vm.gradeTypes = selectOptionService.getGradeTypes();
        
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