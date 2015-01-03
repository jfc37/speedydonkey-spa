(function () {
    'use strict';

    angular
        .module('app.gradeCenter')
        .controller('GradeCenter', GradeCenter);

    GradeCenter.$inject = ['$q', '$routeParams', 'gradeCenterService', 'logger', 'routehelper'];

    /* @ngInject */
    function GradeCenter($q, $routeParams, gradeCenterService, logger, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.courseWorks = [];

        vm.toggleGrade = function(courseWork) {
            if (courseWork.enabled === undefined) {
                courseWork.enabled = true;
            }
            else {
                courseWork.enabled = !courseWork.enabled;
            }
        };

        vm.recalculateGrade = function() {
            vm.calculatedGrade = gradeCenterService.calculateWeightedGrade(vm.courseWorks, vm.gradeType);
        };

        vm.saveGrade = function(courseWork) {
            gradeCenterService.saveGrade(vm.courseId, courseWork).then(function() {
                logger.success("Grade saved");
            }, function() {
                logger.error("Failed to save grade");
            });
        };

        activate();

        function activate() {
            var promises = [getCourse()];
            return $q.all(promises).then(function(){
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getCourse() {
            gradeCenterService.getCourseGrades($routeParams.courseName).then(function (courseGrade) {
                vm.courseWorks = courseGrade.course.courseWorks;

                vm.gradeType = courseGrade.course.grade_type;
                vm.courseId = courseGrade.course.id;
                vm.title = courseGrade.course.name;

                vm.recalculateGrade();
            }, function () {
                logger.error("Problem loading course");
            });
        }
    }
})();