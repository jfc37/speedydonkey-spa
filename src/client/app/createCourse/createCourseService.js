(function () {
    'use strict';

    angular
        .module('app.createCourse')
        .factory('createCourseService', createCourseService);

    createCourseService.$inject = ['$q', 'dataCreateService'];

    /* @ngInject */
    function createCourseService($q, dataCreateService) {
        /*jshint validthis: true */
        var service = {
            createCourse: createCourse
        };

        function createCourse(course){
            return $q(function (resolve, revoke) {
                dataCreateService.createCourse(course).then(function (createdCourse) {
                    resolve(createdCourse);
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