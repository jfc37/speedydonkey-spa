(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .factory('blockEnrolmentService', blockEnrolmentService);

    /* @ngInject */
    function blockEnrolmentService($q, authService, simpleApiCaller) {

        var service = {
            getBlocksForEnrolment: getBlocksForEnrolment,
            enrol: enrol
        };

        function getBlocksForEnrolment() {
            return simpleApiCaller.get({
                resource: 'blocks/for-enrolment',
                block: true
            }).then(function (response) {
                return response.data;
            });
        }

        function enrol(blocks) {
            var enrolment = {
                blockIds: blocks.map(function (block) {
                    return block.id;
                })
            };

            return simpleApiCaller.post(enrolment, {
                resource: 'users/current/enrolment',
                block: true
            });
        }

        return service;

    }
})();
