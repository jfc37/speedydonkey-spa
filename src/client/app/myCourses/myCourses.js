(function () {
    'use strict';

    angular
        .module('app.myCourses')
        .controller('MyCourses', MyCourses);

    MyCourses.$inject = ['$q', 'myCoursesService', 'logger'];

    /* @ngInject */
    function MyCourses($q, myCoursesService, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'My Courses';
        vm.courses = [];

        activate();

        function activate() {
            var promises = [getCourses()];
            return $q.all(promises).then(function(){
                logger.info('Activated My Courses View');
            });
        }

        function getCourses() {
            myCoursesService.getCourses().then(function (courses) {
                vm.courses = courses;
            }, function () {
                logger.error('Problem getting enroled courses');
            });
        }
    }
})();