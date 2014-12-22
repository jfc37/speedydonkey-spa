(function () {
    'use strict';

    angular
        .module('app.manageCourse')
        .factory('manageLectureService', manageLectureService);

    manageLectureService.$inject = ['$q', 'dataCreateService', 'dataUpdateService', 'dataDeleteService'];

    /* @ngInject */
    function manageLectureService($q, dataCreateService, dataUpdateService, dataDeleteService) {
        /*jshint validthis: true */
        var service = {
            createLecture: createLecture,
            updateLecture: updateLecture,
            deleteLecture: deleteLecture
        };

        function createLecture(courseId, lecture){
            return $q(function (resolve, revoke) {
                dataCreateService.createLecture(courseId, lecture).then(function (createdLecture) {
                    resolve(createdLecture);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        }

        function updateLecture(courseId, lecture){
            return $q(function (resolve, revoke) {
                dataUpdateService.updateLecture(courseId, lecture).then(function (createdLecture) {
                    resolve(createdLecture);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();   
                    }
                });
            });
        }

        function deleteLecture(courseId, lecture){
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteLecture(courseId, lecture).then(function () {
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