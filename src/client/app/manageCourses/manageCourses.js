(function () {
    'use strict';

    angular
        .module('app.manageCourses')
        .controller('ManageCourses', ManageCourses);

    ManageCourses.$inject = ['$q', 'dataservice', 'logger'];

    /* @ngInject */
    function ManageCourses($q, dataservice, logger) {
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
            return dataservice.getCourses().then(function (data) {
                vm.courses = data;
                return vm.courses;
            });
        }
    }
})();