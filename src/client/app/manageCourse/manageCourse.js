(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .controller('ManageCourse', ManageCourse);

    ManageCourse.$inject = ['$q', '$routeParams', 'dataservice', 'dataUpdateService', 'dataCreateService', 'logger'];

    /* @ngInject */
    function ManageCourse($q, $routeParams, dataservice, dataUpdateService, dataCreateService, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.course = {};
        vm.assignments = [];
        vm.new_assignment = {};
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

        vm.updateAssignment = function(assignment, form) {
            dataUpdateService.updateAssignment(assignment).then(function(data) {
                if (data.is_valid){
                    form.$setPristine();
                    assignment.is_editing = false;
                } else {
                    logger.error("Assignment failed to update");
                }
            });
        };

        vm.createAssignment = function(assignment, form) {
            dataCreateService.createAssignment(assignment).then(function(data) {
                if (data.is_valid){
                    vm.new_assignment.is_editing = false;
                    vm.assignments.push(data.action_result);

                    assignment = {};
                    form.$setPristine();
                } else {
                    logger.error("Assignment failed to create");
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