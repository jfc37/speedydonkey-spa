(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataCreateService', dataCreateService);

    dataCreateService.$inject = ['$q', 'logger', 'apiCaller', 'authService', 'dateService'];

    /* @ngInject */
    function dataCreateService($q, logger, apiCaller, authService, dateService) {
        var service = {
            createCourse: createCourse,
            createUser: createUser,
            createPerson: createPerson,
            createAssignment: createAssignment,
            createExam: createExam,

            createLecture: createLecture,
            createNotice: createNotice,
        };

        return service;

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




        function createCourse(course) {
            return $q(function (resolve, revoke) {
                apiCaller.postCourse(authService.getUserIdentity().personId, course).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function createAssignment(courseId, assignment) {
            return $q(function (resolve, revoke) {
                apiCaller.postAssignment(courseId, assignment).success(function (response) {
                    dateService.convertStringsToDates(response.action_result);
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function createExam(courseId, exam) {
            return $q(function (resolve, revoke) {
                apiCaller.postExam(courseId, exam).success(function (response) {
                    dateService.convertStringsToDates(response.action_result);
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function createUser(user) {
            return $q(function (resolve, reject) {
                apiCaller.postUser(user).success(function(response) {
                    logger.info('Successfully created user ' + user.username);
                    resolve(response.action_result);
                }).error(function(response) {
                    reject(response);
                });
            }); 
        }

        function createPerson(person) {
            return $q(function (resolve, reject) {
                apiCaller.postPerson({user_id: authService.getUserIdentity().userId}, person).success(function(response, data) {
                    logger.info('Successfully created person ' + response.action_result.first_name + ' ' + response.action_result.surname);
                    resolve(response.action_result);
                }).error(function(response) {
                    reject(response);
                });
            });
        }
    }
})();