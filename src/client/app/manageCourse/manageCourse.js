(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .controller('ManageCourse', ManageCourse);

    ManageCourse.$inject = ['$q', '$routeParams', 'manageCourseService', 'dataUpdateService', 'dataCreateService', 'dataDeleteService', 'logger'];

    /* @ngInject */
    function ManageCourse($q, $routeParams, manageCourseService, dataUpdateService, dataCreateService, dataDeleteService, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = $routeParams.courseName;

        vm.course = {};
        vm.assignments = [];
        vm.exams = [];
        vm.lectures = [];
        vm.notices = [];

        vm.new_assignment = {};
        vm.new_exam = {};
        vm.new_lecture = {};
        vm.new_notice = {};

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


        vm.updateNotice = function(notice, form) {
            dataUpdateService.updateNotice(notice).then(function(data) {
                if (data.is_valid){
                    form.$setPristine();
                    notice.is_editing = false;
                } else {
                    logger.error("Notice failed to update");
                }
            });
        };

        vm.createNotice = function(notice, form) {
            dataCreateService.createNotice(notice).then(function(data) {
                if (data.is_valid){
                    vm.new_notice.is_editing = false;
                    vm.notices.push(data.action_result);

                    notice = {};
                    form.$setPristine();
                } else {
                    logger.error("Notice failed to create");
                }
            });
        };

        vm.deleteNotice = function(notice) {
            dataDeleteService.deleteNotice(notice).then(function(data) {
                if (data.is_valid) {
                    var index = vm.notices.indexOf(notice);
                    if (index > -1) {
                        vm.notices.splice(index, 1);
                    }
                } else {
                    logger.error("Notice failed to delete");
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
                manageCourseService.getCourse($routeParams.courseName).then(function (course) {
                    vm.course = course;
                    vm.assignments = course.assignments;
                    vm.exams = course.exams;
                    vm.lectures = course.lectures;
                    vm.notices = course.notices;
                    logger.success("Loaded course");
                }, function () {
                    logger.error("Problem loading course");
                });
            }
        }
    }
})();