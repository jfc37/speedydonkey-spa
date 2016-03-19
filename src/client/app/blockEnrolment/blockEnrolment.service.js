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
            var allBlocks = [];
            var userEnroledBlocksIds = [];

            var blocksRequest = simpleApiCaller.get({
                resource: 'blocks/for-enrolment',
                block: true
            }).then(function (response) {
                allBlocks = response.data;
            });

            var userEnrolmentRequest = simpleApiCaller.get({
                resource: 'users/current/blocks',
                block: true
            }).then(function (response) {
                userEnroledBlocksIds = response.data.map(function (block) {
                    return block.id;
                });
            });

            return $q.all([blocksRequest, userEnrolmentRequest]).then(function () {
                allBlocks.forEach(function (block) {
                    var isUserEnrolledInBlock = userEnroledBlocksIds.indexOf(block.id) > -1;
                    block.isEnroled = isUserEnrolledInBlock;
                });

                return allBlocks;
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
