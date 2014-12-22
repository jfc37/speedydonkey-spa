(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .controller('ManageCourse', ManageCourse);

    ManageCourse.$inject = ['$q', '$routeParams', 'manageCourseService', 'manageAssignmentService', 'manageExamService', 'manageLectureService', 'manageNoticeService', 'logger', 'selectOptionService', 'validationService'];

    /* @ngInject */
    function ManageCourse($q, $routeParams, manageCourseService, manageAssignmentService, manageExamService, manageLectureService, manageNoticeService, logger, selectOptionService, validationService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = $routeParams.courseName;
        vm.gradeTypes = selectOptionService.getGradeTypes();
        vm.occurences = selectOptionService.getOccurences();

        vm.course = {};
        vm.assignments = [];
        vm.exams = [];
        vm.lectures = [];
        vm.notices = [];

        vm.updateCourseDetails = function(form) {
            manageCourseService.updateCourseDetails(vm.course).then(function() {
                form.$setPristine();
                logger.success("Course updated");
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
                logger.error("Problem updating course");
            });
        };

        vm.addNew = function(collection) {
            collection.push({
                is_editing: true
            });
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
            afterSubmit(promise, assignment, form);
        };

        vm.deleteAssignment = function(assignment) {
            var promise = manageAssignmentService.deleteAssignment(vm.course.id, assignment);
            afterDelete(promise, assignment, vm.assignments);
        };

        vm.submitExam = function(exam, form) {
            var promise;
            if (exam.id) {
                promise = manageExamService.updateExam(vm.course.id, exam);
            } else {
                promise = manageExamService.createExam(vm.course.id, exam);
            }
            afterSubmit(promise, exam, form);
        };

        vm.deleteExam = function(exam) {
            var promise = manageExamService.deleteExam(vm.course.id, exam);
            afterDelete(promise, exam, vm.exams);
        };

        vm.submitLecture = function(lecture, form) {
            var promise;
            if (lecture.id) {
                promise = manageLectureService.updateLecture(vm.course.id, lecture);
            } else {
                promise = manageLectureService.createLecture(vm.course.id, lecture);
            }
            afterSubmit(promise, lecture, form);
        };

        vm.deleteLecture = function(lecture) {
            var promise = manageLectureService.deleteLecture(vm.course.id, lecture);
            afterDelete(promise, lecture, vm.lectures);
        };

        vm.submitNotice = function(notice, form) {
            var promise;
            if (notice.id) {
                promise = manageNoticeService.updateNotice(vm.course.id, notice);
            } else {
                promise = manageNoticeService.createNotice(vm.course.id, notice);
            }
            afterSubmit(promise, notice, form);
        };

        vm.deleteNotice = function(notice) {
            var promise = manageNoticeService.deleteNotice(vm.course.id, notice);
            afterDelete(promise, notice, vm.notices);
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

        function afterSubmit(promise, object, form) {
            promise.then(function (createdObject) {
                object.id = createdObject.id;
                vm.toggleEdit(object);
                form.$setPristine();
                logger.success("Created/Updated");
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
                logger.error("Failed to create/update");
            });
        }

        function afterDelete(promise, object, collection) {
            promise.then(function (deletedObject) {
                var index = collection.indexOf(object);
                if (index > -1) {
                    collection.splice(index, 1);
                }
                logger.success("Deleted");
            }, function () {
                logger.error("Failed to delete");
            });
        }
    }
})();