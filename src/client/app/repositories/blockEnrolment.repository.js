(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('blockEnrolmentRepository', blockEnrolmentRepository);

    /* @ngInject */
    function blockEnrolmentRepository(simpleApiCaller) {
        var service = {
            enrol: enrol
        };

        return service;

        function enrol(block, student) {
            var options = {
                resource: 'users/' + student.id + '/enrolment',
                block: true
            };

            var enrolment = {
                userId: student.id,
                blockIds: [block.id]
            };

            return simpleApiCaller.post(enrolment, options).then(function (response) {
                return response.data;
            });
        }
    }
})();
