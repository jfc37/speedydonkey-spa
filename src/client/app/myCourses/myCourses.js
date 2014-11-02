(function () {
    'use strict';

    angular
        .module('app.myCourses')
        .controller('MyCourses', MyCourses);

    MyCourses.$inject = ['$q', 'dataservice', 'logger'];

    /* @ngInject */
    function MyCourses($q, dataservice, logger) {
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
            return dataservice.getCourses().then(function (data) {
                vm.courses = data;
                return vm.courses;
            });
        }
    }
})();