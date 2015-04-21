(function () {
    'use strict';

    angular
        .module('app.manageLevels')
        .factory('manageLevelsService', manageLevelsService);

    manageLevelsService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function manageLevelsService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService){

        var service = {
            create: create,
            update: update,
            getLevels: getLevels,
            generateBlock: generateBlock,
            generateAllBlocks: generateAllBlocks,
            deleteLevel: deleteLevel
        };

        function create(level) {
            return $q(function (resolve, revoke) {
                dataCreateService.createLevel(level).then(function (createdLevel) {
                    resolve(createdLevel);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function update(level) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateLevel(level).then(function (updatedLevel) {
                    resolve(updatedLevel);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function getLevels() {
            return $q(function (resolve, revoke) {
                dataservice.getAllLevels().then(function (passOptions) {
                    resolve(passOptions);
                }, revoke);
            });
        }

        function generateBlock(id) {
            return $q(function (resolve, revoke) {
                dataCreateService.createBlock(id).then(resolve, revoke);
            });
        }

        function generateAllBlocks() {
            return generateBlock('all');
        }

        function deleteLevel(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteLevel(id).then(resolve, revoke);
            });
        }

        return service;

    }
})();