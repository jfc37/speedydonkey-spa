(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .factory('manageBlocksService', manageBlocksService);

    /* @ngInject */
    function manageBlocksService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService) {

        var service = {
            update: update,
            getBlocks: getBlocks,
            deleteBlock: deleteBlock
        };

        function update(block) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateBlock(block).then(function (updatedBlock) {
                    resolve(updatedBlock);
                }, function (response) {
                    if (response.validationResult !== undefined) {
                        revoke(response.validationResult.validationErrors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function getBlocks() {
            return $q(function (resolve, revoke) {
                dataservice.getAllActiveBlocks().then(function (blocks) {
                    resolve(blocks);
                }, revoke);
            });
        }

        function deleteBlock(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteBlock(id).then(resolve, revoke);
            });
        }

        return service;

    }
})();
