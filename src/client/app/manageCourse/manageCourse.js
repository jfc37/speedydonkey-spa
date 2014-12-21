(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .controller('ManageCourse', ManageCourse);

    ManageCourse.$inject = ['$q', '$routeParams', 'manageCourseService', 'manageAssignmentService', 'dataUpdateService', 'dataCreateService', 'dataDeleteService', 'logger', 'selectOptionService', 'validationService'];

    /* @ngInject */
    function ManageCourse($q, $routeParams, manageCourseService, manageAssignmentService, dataUpdateService, dataCreateService, dataDeleteService, logger, selectOptionService, validationService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = $routeParams.courseName;
        vm.gradeTypes = selectOptionService.getGradeTypes();

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
            manageCourseService.updateCourseDetails(vm.course).then(function() {
                form.$setPristine();
                logger.success("Course updated")
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
                logger.error("Problem updating course");
            });
        };

        vm.newAssignment = function() {
            vm.assignments.push(vm.getNew());
        };

        vm.getNew = function() {
            return {
                is_editing: true
            }
        };

        vm.getSubmitText = function(object) {
            if (object.id) {
                return 'Update';
            }
            return 'Create';
        };

        vm.cancel = function(object, collection) {
            if (object.id) {
                vm.toggleEdit(object);
            } else {
                collection.pop();
            }
        };

        vm.submitAssignment = function(assignment, form) {
            var promise;
            if (assignment.id) {
                promise = manageAssignmentService.updateAssignment(vm.course.id, assignment);
            } else {
                promise = manageAssignmentService.createAssignment(vm.course.id, assignment);
            }
            promise.then(function (createdAssignment) {
                assignment.id = createdAssignment.id;
                vm.toggleEdit(assignment);
                form.$setPristine();
                logger.success("Assignment created/updated");
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
                logger.error("Assignment failed to create");
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
            if (model.is_editing === undefined) {
                model.is_editing = false;
            } else {
                model.is_editing = !model.is_editing;
            }
        };

        activate();

        function activate() {
            var promises = [getCourse()];
            return $q.all(promises).then(function(){
                logger.info('Activated ' + vm.courseName + ' View');
            });
        }

        function getCourse() {
            if ($routeParams.courseName !== undefined) {
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