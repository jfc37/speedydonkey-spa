(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .controller('ManageCourse', ManageCourse);

    ManageCourse.$inject = ['$q', '$routeParams', 'dataservice', 'dataUpdateService', 'dataCreateService', 'dataDeleteService', 'logger'];

    /* @ngInject */
    function ManageCourse($q, $routeParams, dataservice, dataUpdateService, dataCreateService, dataDeleteService, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = $routeParams.courseName;

        vm.course = {};
        vm.assignments = [];
        vm.exams = [];
        vm.lectures = [];

        vm.new_assignment = {};
        vm.new_exam = {};
        vm.new_lecture = {};

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
                    vm.assignments.push(data.action_result);
                    assignment = {};
                    vm.new_assignment = {};
                    form.$setPristine();
                } else {
                    logger.error("Assignment failed to create");
                }
            });
        };

        vm.deleteAssignment = function(assignment) {
            dataDeleteService.deleteAssignment(assignment).then(function(data) {
                if (data.is_valid) {
                    var index = vm.assignments.indexOf(assignment);
                    if (index > -1) {
                        vm.assignments.splice(index, 1);
                    }
                } else {
                    logger.error("Assignment failed to delete");
                }
            });
        };


        vm.updateExam = function(exam, form) {
            dataUpdateService.updateExam(exam).then(function(data) {
                if (data.is_valid){
                    form.$setPristine();
                    exam.is_editing = false;
                } else {
                    logger.error("Exam failed to update");
                }
            });
        };

        vm.createExam = function(exam, form) {
            dataCreateService.createExam(exam).then(function(data) {
                if (data.is_valid){
                    vm.new_exam.is_editing = false;
                    vm.exams.push(data.action_result);

                    exam = {};
                    form.$setPristine();
                } else {
                    logger.error("Exam failed to create");
                }
            });
        };

        vm.deleteExam = function(exam) {
            dataDeleteService.deleteExam(exam).then(function(data) {
                if (data.is_valid) {
                    var index = vm.exams.indexOf(exam);
                    if (index > -1) {
                        vm.exams.splice(index, 1);
                    }
                } else {
                    logger.error("Exam failed to delete");
                }
            });
        };


        vm.updateLecture = function(lecture, form) {
            dataUpdateService.updateLecture(lecture).then(function(data) {
                if (data.is_valid){
                    form.$setPristine();
                    lecture.is_editing = false;
                } else {
                    logger.error("Lecture failed to update");
                }
            });
        };

        vm.createLecture = function(lecture, form) {
            dataCreateService.createLecture(lecture).then(function(data) {
                if (data.is_valid){
                    vm.new_lecture.is_editing = false;
                    vm.lectures.push(data.action_result);

                    lecture = {};
                    form.$setPristine();
                } else {
                    logger.error("Lecture failed to create");
                }
            });
        };

        vm.deleteLecture = function(lecture) {
            dataDeleteService.deleteLecture(lecture).then(function(data) {
                if (data.is_valid) {
                    var index = vm.lectures.indexOf(lecture);
                    if (index > -1) {
                        vm.lectures.splice(index, 1);
                    }
                } else {
                    logger.error("Lecture failed to delete");
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
                    vm.exams = data.exams;
                    vm.lectures = data.lectures;
                    return vm.course;
                });
            }
        }
    }
})();