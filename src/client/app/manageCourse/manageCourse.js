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
        vm.assignments = [];
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

        vm.toggleEdit = function(model){
            model.is_editing = !model.is_editing;
        }

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
                    vm.assignments = data.assignments;
                    return vm.course;
                });
            }
        }
    }
})();