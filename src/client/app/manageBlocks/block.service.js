(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .factory('blockService', blockService);

    /* @ngInject */
    function blockService(simpleApiCaller) {

        var service = {
            update: update,
            create: create,
            getBlocks: getBlocks,
            getBlock: getBlock,
            deleteBlock: deleteBlock
        };

        function update(block) {
            var sanitisedBlock = block;
            sanitisedBlock.announcements = undefined;
            sanitisedBlock.classes = undefined;
            sanitisedBlock.enroledStudents = undefined;

            var options = {
                resource: 'blocks',
                id: block.id,
                block: true
            };

            return simpleApiCaller.put(sanitisedBlock, options).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.validationResult) {
                    return response.validationResult.validationErrors;
                }
            });
        }

        function create(block) {
            var options = {
                resource: 'blocks',
                block: true
            };

            return simpleApiCaller.post(block, options).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.validationResult) {
                    return response.validationResult.validationErrors;
                }
            });
        }

        function getBlocks() {
            var options = {
                resource: 'blocks',
                search: [
                    {
                        field: 'endDate',
                        condition: 'gt',
                        value: moment().format('YYYY-MM-DD')
                    }
                ],
                block: true
            };

            return simpleApiCaller.get(options).then(function (response) {
                var blocks = response.data;

                var today = new Date();
                blocks.forEach(function (block) {
                    if (moment(block.startDate).isAfter(today)) {
                        block.status = 'Future';
                    } else {
                        block.status = 'Current';
                    }
                });

                return blocks;
            });
        }

        function getBlock(id) {
            var options = {
                resource: 'blocks',
                id: id,
                block: true
            };

            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            });
        }

        function deleteBlock(block) {
            var options = {
                resource: 'blocks',
                id: block.id
            };

            return simpleApiCaller.delete(options);
        }

        return service;

    }
})();
