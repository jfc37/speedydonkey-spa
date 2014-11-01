(function () {
    'use strict';

    angular
        .module('app.course')
        .controller('Course', Course);

    Course.$inject = ['$q', 'dataservice', 'logger'];

    /* @ngInject */
    function Course($q, dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'My Courses';
        vm.courses = [];

        activate();

        function activate() {
            var promises = [getCourses()];
            return $q.all(promises).then(function(){
                logger.info('Activated Course View');
            });
        }

        function getCourses() {
            return dataservice.getCourses().then(function (data) {
                vm.courses = data;
                return vm.courses;
            });
        }
    }
})();