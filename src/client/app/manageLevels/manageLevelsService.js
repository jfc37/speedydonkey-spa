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
            getLevels: getLevels
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

        function getLevels() {
            return $q(function (resolve, revoke) {
                dataservice.getAllLevels().then(function (passOptions) {
                    resolve(passOptions);
                }, revoke);
            });
        }

        return service;

    }
})();