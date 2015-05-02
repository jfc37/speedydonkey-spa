(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .factory('manageClassesService', manageClassesService);

    manageClassesService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function manageClassesService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService){

        var service = {
            update: update,
            getClasses: getClasses,
            deleteClass: deleteClass
        };

        function update(theClass) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateClass(theClass).then(function (updatedClass) {
                    resolve(updatedClass);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function getClasses() {
            return $q(function (resolve, revoke) {
                dataservice.getAllActiveClasses().then(function (classes) {
                    resolve(classes);
                }, revoke);
            });
        }

        function deleteClass(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteClass(id).then(resolve, revoke);
            });
        }

        return service;

    }
})();