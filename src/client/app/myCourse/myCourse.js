(function () {
    'use strict';

    angular
        .module('app.myCourse')
        .controller('MyCourse', MyCourse);

    MyCourse.$inject = ['$q', '$routeParams', 'myCourseService', 'logger', 'routehelper'];

    /* @ngInject */
    function MyCourse($q, $routeParams, myCourseService, logger, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.course = {};

        vm.goToMeetingRoom = function() {
            routehelper.redirectToRoute('meetingRoom', {courseName: vm.title});
        };

        vm.goToGradeCenter = function() {
            routehelper.redirectToRoute('gradeCenter', {courseName: vm.title});
        };

        activate();

        function activate() {
            var promises = [getCourse()];
            return $q.all(promises).then(function(){
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getCourse() {
            myCourseService.getCourse($routeParams.courseName).then(function (course) {
                vm.course = course;
                vm.title = course.name;
            }, function () {
                logger.error("Problem loading course");
            });
        }
    }
})();