(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .factory('managePassOptionsService', managePassOptionsService);

    managePassOptionsService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function managePassOptionsService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService){

        var service = {
            create: create,
            update: update,
            deletePassOption: deletePassOption,
            getPassOptions: getPassOptions
        };

        function create(passOption) {
            return $q(function (resolve, revoke) {
                dataCreateService.createPassOption(passOption).then(function (createdPassOption) {
                    resolve(createdPassOption);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function update(passOption) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updatePassOption(passOption).then(function (updatedPassOption) {
                    resolve(updatedPassOption);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function deletePassOption(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deletePassOption(id).then(resolve, revoke);
            });
        }

        function getPassOptions() {
            return $q(function (resolve, revoke) {
                dataservice.getAllPassOptions().then(function (passOptions) {
                    resolve(passOptions);
                }, revoke);
            });
        }

        return service;

    }
})();