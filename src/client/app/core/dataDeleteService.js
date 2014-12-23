(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataDeleteService', dataDeleteService);

    dataDeleteService.$inject = ['$q', 'apiCaller'];

    /* @ngInject */
    function dataDeleteService($q, apiCaller) {
        var service = {
            deleteAssignment: deleteAssignment,
            deleteExam: deleteExam,
            deleteLecture: deleteLecture,
            deleteNotice: deleteNotice,
        };

        return service;

        function deleteAssignment(courseId, assignment) {
            return $q(function (resolve, revoke) {
                apiCaller.deleteAssignment(courseId, assignment).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function deleteExam(courseId, exam) {
            return $q(function (resolve, revoke) {
                apiCaller.deleteExam(courseId, exam).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function deleteLecture(courseId, lecture) {
            return $q(function (resolve, revoke) {
                apiCaller.deleteLecture(courseId, lecture).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }

        function deleteNotice(courseId, notice) {
            return $q(function (resolve, revoke) {
                apiCaller.deleteNotice(courseId, notice).success(function (response) {
                    resolve(response.action_result);
                }).error(function (response) {
                    revoke(response);
                });
            });
        }
    }
})();