(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .controller('ManageCourse', ManageCourse);

    ManageCourse.$inject = ['$q', '$routeParams', 'dataservice', 'dataUpdateService', 'logger'];

    /* @ngInject */
    function ManageCourse($q, $routeParams, dataservice, dataUpdateService, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.course = {};
        vm.title = $routeParams.courseName;

        vm.updateCourseDetails = function(form) {
            dataUpdateService.updateCourse(vm.course).then(function(data) {
                if (data.is_valid){
                    form.$setPristine();
                } else {
                    logger.error("Course details failed to update");
                }
            });
        };

        activate();

        function activate() {
            var promises = [getCourse()];
            return $q.all(promises).then(function(){
                logger.info('Activated ' + vm.courseName + ' View');
            });
        }

        function getCourse() {
            if ($routeParams.courseName !== undefined){
                return dataservice.getCourse($routeParams.courseName).then(function (data) {
                    vm.course = data;
                    return vm.course;
                });
            }
        }
    }
})();