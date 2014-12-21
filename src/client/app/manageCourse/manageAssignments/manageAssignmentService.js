(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .factory('manageAssignmentService', manageAssignmentService);

    manageAssignmentService.$inject = ['$q', 'dataCreateService', 'dataUpdateService', 'dataDeleteService'];

    /* @ngInject */
    function manageAssignmentService($q, dataCreateService, dataUpdateService, dataDeleteService) {
        /*jshint validthis: true */
        var service = {
            createAssignment: createAssignment,
            updateAssignment: updateAssignment,
            deleteAssignment: deleteAssignment
        };

        function createAssignment(courseId, assignment){
            return $q(function (resolve, revoke) {
                dataCreateService.createAssignment(courseId, assignment).then(function (createdAssignment) {
                    resolve(createdAssignment);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        }

        function updateAssignment(courseId, assignment){
            return $q(function (resolve, revoke) {
                dataUpdateService.updateAssignment(courseId, assignment).then(function (createdAssignment) {
                    resolve(createdAssignment);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        }

        function deleteAssignment(courseId, assignment){
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteAssignment(courseId, assignment).then(function () {
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