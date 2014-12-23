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
                vm.title = course.name;
            }, function () {
                logger.error("Problem loading course");
            });
        }
    }
})();