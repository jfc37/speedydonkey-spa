(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dataservice', 'dashboardService', 'logger'];

    /* @ngInject */
    function Dashboard($q, dataservice, dashboardService, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.courseNotices = [];
        vm.upcomingDeadline = [];
        vm.upcomingLectures = [];
        vm.recentGrades = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [init()];
            return $q.all(promises).then(function(){
                logger.info('Activated Dashboard View');
            });
        }

        function init() {
            dashboardService.loadEnroledCourses().then(function (courses) {
                getCourseNotices(courses);
            }, function () {
                logger.error("Problem loading courses");
            });
        }

        function getCourseNotices(courses) {
            courses.forEach(function (course) {
                Array.prototype.push.apply(vm.courseNotices, course.notices);
            });
        }

        function getUpcomingDeadlines() {
            return dataservice.getUpcomingDeadlines().then(function (data) {
                vm.upcomingDeadline = data;
                return vm.upcomingDeadline;
            });
        }

        function getUpcomingLectures() {
            return dataservice.getUpcomingLectures().then(function (data) {
                vm.upcomingLectures = data;
                return vm.upcomingLectures;
            });
        }

        function getRecentGrades() {
            return dataservice.getRecentGrades().then(function (data) {
                vm.recentGrades = data;
                return vm.recentGrades;
            });
        }
    }
})();
