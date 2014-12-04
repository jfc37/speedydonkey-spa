(function () {
    'use strict';

    angular
        .module('app.manageCourses')
        .controller('ManageCourses', ManageCourses);

    ManageCourses.$inject = ['$q', 'manageCoursesService', 'logger'];

    /* @ngInject */
    function ManageCourses($q, manageCoursesService, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Manage Courses';
        vm.courses = [];

        activate();

        function activate() {
            var promises = [getCourses()];
            return $q.all(promises).then(function(){
                logger.info('Activated Manage Courses View');
            });
        }

        function getCourses() {
            return manageCoursesService.getCourses().then(function (courses) {
                vm.courses = courses;
                return vm.courses;
            });
        }
    }
})();