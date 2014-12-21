(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .factory('manageAssignmentService', manageAssignmentService);

    manageAssignmentService.$inject = ['$q', 'dataCreateService'];

    /* @ngInject */
    function manageAssignmentService($q, dataCreateService) {
        /*jshint validthis: true */
        var service = {
            createAssignment: createAssignment
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

        return service;
    }
})();