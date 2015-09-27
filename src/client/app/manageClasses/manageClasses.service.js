(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .factory('manageClassesService', manageClassesService);

    /* @ngInject */
    function manageClassesService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService) {

        var service = {
            update: update,
            deleteClass: deleteClass,
            filterClasses: filterClasses
        };

        function update(theClass) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateClass(theClass).then(function (updatedClass) {
                    resolve(updatedClass);
                }, function (response) {
                    if (response.validationResult !== undefined) {
                        revoke(response.validationResult.validationErrors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function deleteClass(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteClass(id).then(resolve, revoke);
            });
        }

        function filterClasses(filter) {
            return $q(function (resolve, revoke) {
                dataservice.searchForClasses(filter).then(function (response) {
                    response.data.forEach(function (theClass) {
                        theClass.block = undefined;
                    });
                    resolve(response.data);
                }, function (response) {
                    if (response.status === 404) {
                        resolve([]);
                    }
                    revoke(response);
                });
            });
        }

        return service;

    }
})();
