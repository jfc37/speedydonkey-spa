(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataCreateService', dataCreateService);

    dataCreateService.$inject = ['$q', 'logger'];

    /* @ngInject */
    function dataCreateService($q, logger) {
        var service = {
            createAssignment: createAssignment
        };

        return service;

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
    }
})();