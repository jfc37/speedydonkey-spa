(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dashboardService', 'logger'];

    /* @ngInject */
    function Dashboard($q, dashboardService, logger) {
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
            return $q.when(promises).then(function(){
                logger.info('Activated Dashboard View');
            });
        }

        function init() {
            dashboardService.loadEnroledCourses().then(function (courses) {
                getCourseNotices();
                getUpcomingLectures();
                getUpcomingDeadlines();
            }, function () {
                logger.error("Problem loading courses");
            });
        }

        function getCourseNotices() {
            dashboardService.getCourseNotices().then(function (courseNotices) {
                vm.courseNotices = courseNotices;
            });
        }

        function getUpcomingDeadlines(courses) {
            dashboardService.getUpcomingDeadlines().then(function (deadlines) {
                vm.upcomingDeadline = deadlines;
            });
        }

        function getUpcomingLectures() {
            dashboardService.getCourseNotices().then(function (lectures) {
                vm.upcomingLectures = lectures;
            });
        }
    }
})();
