(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .factory('manageNoticeService', manageNoticeService);

    manageNoticeService.$inject = ['$q', 'dataCreateService', 'dataUpdateService', 'dataDeleteService'];

    /* @ngInject */
    function manageNoticeService($q, dataCreateService, dataUpdateService, dataDeleteService) {
        /*jshint validthis: true */
        var service = {
            createNotice: createNotice,
            updateNotice: updateNotice,
            deleteNotice: deleteNotice
        };

        function createNotice(courseId, notice){
            return $q(function (resolve, revoke) {
                dataCreateService.createNotice(courseId, notice).then(function (createdNotice) {
                    resolve(createdNotice);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        }

        function updateNotice(courseId, notice){
            return $q(function (resolve, revoke) {
                dataUpdateService.updateNotice(courseId, notice).then(function (createdNotice) {
                    resolve(createdNotice);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        }

        function deleteNotice(courseId, notice){
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteNotice(courseId, notice).then(function () {
                    resolve();
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        }

        return service;
    }
})();