(function () {
    'use strict';

    angular
        .module('app.myCourses')
        .controller('MyCourses', MyCourses);

    MyCourses.$inject = ['$q', 'dataservice', 'logger', 'authService'];

    /* @ngInject */
    function MyCourses($q, dataservice, logger, authService) {
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
            return dataservice.getStudent(authService.getUserIdentity().personId, function (student) {
                vm.courses = student.enroled_courses;
                return vm.courses;
            }, function() {
                logger.error('Problem getting enroled courses')
            });
        }
    }
})();