(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .factory('manageExamService', manageExamService);

    manageExamService.$inject = ['$q', 'dataCreateService', 'dataUpdateService', 'dataDeleteService'];

    /* @ngInject */
    function manageExamService($q, dataCreateService, dataUpdateService, dataDeleteService) {
        /*jshint validthis: true */
        var service = {
            createExam: createExam,
            updateExam: updateExam,
            deleteExam: deleteExam
        };

        function createExam(courseId, exam){
            return $q(function (resolve, revoke) {
                dataCreateService.createExam(courseId, exam).then(function (createdExam) {
                    resolve(createdExam);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        }

        function updateExam(courseId, exam){
            return $q(function (resolve, revoke) {
                dataUpdateService.updateExam(courseId, exam).then(function (createdExam) {
                    resolve(createdExam);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        }

        function deleteExam(courseId, exam){
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteExam(courseId, exam).then(function () {
                    resolve();
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        }

        return service;
    }
})();