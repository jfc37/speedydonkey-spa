(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .factory('blockService', blockService);

    /* @ngInject */
    function blockService($q, simpleApiCaller) {

        var service = {
            update: update,
            create: create,
            getBlocks: getBlocks,
            getBlock: getBlock,
            deleteBlocks: deleteBlocks,
            generateFromBlocks: generateFromBlocks,
            getBlockClasses: getBlockClasses,
            changeRoom: changeRoom
        };

        function changeRoom(block, room) {
            var options = getOptions();
            var request;

            if (!room) {
                options.resource = options.resource + '/' + block.id + '/rooms';
                request = simpleApiCaller.delete(options);
            } else {
                options.resource = options.resource + '/' + block.id + '/rooms/' + room.id;
                request = simpleApiCaller.put({}, options);
            }

            return request.then(function (response) {
                return response.data;
            }, function (response) {
                if (response.validationResult) {
                    return response.validationResult.validationErrors;
                }
            });
        }

        function update(block) {
            var sanitisedBlock = block;
            sanitisedBlock.announcements = undefined;
            sanitisedBlock.classes = undefined;
            sanitisedBlock.enroledStudents = undefined;

            var options = getOptions();
            options.id = block.id;

            return simpleApiCaller.put(sanitisedBlock, options).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.validationResult) {
                    return response.validationResult.validationErrors;
                }
            });
        }

        function create(block) {
            return simpleApiCaller.post(block, getOptions()).then(function () {}, function (response) {
                if (response.data.validationResult) {
                    return response.data.validationResult.validationErrors;
                }
            });
        }

        function getBlocks() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                var blocks = response.data;

                var today = new Date();
                blocks.forEach(function (block) {
                    if (moment(block.endDate).isBefore(today)) {
                        block.status = 'Past';
                    } else if (moment(block.startDate).isAfter(today)) {
                        block.status = 'Future';
                    } else {
                        block.status = 'Current';
                    }
                });

                return blocks;
            });
        }

        function getBlock(id) {
            var options = getOptions();
            options.id = id;

            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            });
        }

        function getBlockClasses(block) {
            var options = {
                resource: 'blocks/' + block.id + '/classes'
            };

            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            });
        }

        function deleteBlock(block) {
            var options = getOptions();
            options.id = block.id;

            return simpleApiCaller.delete(options);
        }

        function deleteBlocks(blocks) {
            var deletePromises = [];

            blocks.forEach(function (block) {
                deletePromises.push(deleteBlock(block));
            });

            return $q.all(deletePromises);
        }

        function generateFromBlock(block) {
            var options = getOptions();
            options.id = block.id;

            return simpleApiCaller.post(null, options);
        }

        function generateFromBlocks(blocks) {
            var promises = [];

            blocks.forEach(function (block) {
                promises.push(generateFromBlock(block));
            });

            return $q.all(promises);
        }

        function getOptions() {
            return {
                resource: 'blocks',
                block: true
            };
        }

        return service;

    }
})();
