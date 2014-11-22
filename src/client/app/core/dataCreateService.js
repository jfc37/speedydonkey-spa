(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataCreateService', dataCreateService);

    dataCreateService.$inject = ['$q', 'logger', 'apiCaller', 'authService'];

    /* @ngInject */
    function dataCreateService($q, logger, apiCaller, authService) {
        var service = {
            createCourse: createCourse,
            createAssignment: createAssignment,
            createExam: createExam,
            createLecture: createLecture,
            createNotice: createNotice,
            createUser: createUser,
            createPerson: createPerson
        };

        return service;

        function createCourse(course) {
            logger.info('Successfully created course ' + course.name);
            return $q.when(course);
        }

        function createAssignment(assignment) {
            logger.info('Successfully created assignment ' + assignment.name);
            assignment.is_editing = null;
            return $q.when({
                is_valid: true,
                action_result: {
                    name: assignment.name,
                    description: assignment.description,
                    start_date: assignment.start_date,
                    end_date: assignment.end_date,
                    grade_type: assignment.grade_type
                }
            });
        }

        function createExam(exam) {
            logger.info('Successfully created exam ' + exam.name);
            exam.is_editing = null;
            return $q.when({
                is_valid: true,
                action_result: {
                    name: exam.name,
                    description: exam.description,
                    start_time: exam.start_time,
                    location: exam.location,
                    grade_type: exam.grade_type
                }
            });
        }

        function createLecture(lecture) {
            logger.info('Successfully created lecture ' + lecture.name);
            lecture.is_editing = null;
            return $q.when({
                is_valid: true,
                action_result: {
                    name: lecture.name,
                    description: lecture.description,
                    start_date: lecture.start_date,
                    end_date: lecture.end_date,
                    location: lecture.location,
                    occurence: lecture.occurence
                }
            });
        }

        function createNotice(notice) {
            logger.info('Successfully created notice ' + notice.name);
            notice.is_editing = null;
            return $q.when({
                is_valid: true,
                action_result: {
                    message: notice.message,
                    start_date: notice.start_date,
                    end_date: notice.end_date,
                }
            });
        }

        function createUser(user, success, fail) {
            apiCaller.postUser(user).success(function(response, data) {
                logger.info('Successfully created user ' + user.username);
                success(response.action_result);
            }).error(function(response, data) {
                fail();
            });
        }

        function createPerson(person, success, fail) {
            apiCaller.postPerson({user_id: authService.getUserIdentity().userId}, person).success(function(response, data) {
                logger.info('Successfully created person ' + response.action_result.first_name + ' ' + response.action_result.surname);
                success(response.action_result);
            }).error(function(response, data) {
                fail();
            });
        }
    }
})();