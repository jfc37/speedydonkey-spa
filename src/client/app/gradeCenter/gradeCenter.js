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
            gradeCenterService.saveGrade(courseWork).then(function() {
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
            gradeCenterService.getCourse($routeParams.courseName).then(function (course) {
                vm.courseWorks = course.exams.concat(course.assignments);
                vm.gradeType = course.grade_type;
                vm.title = course.name;
            }, function () {
                logger.error("Problem loading course");
            });
        }
    }
})();