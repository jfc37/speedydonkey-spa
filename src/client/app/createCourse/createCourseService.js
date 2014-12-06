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
                dataCreateService.createCourse(course).then(function (c) {
                    resolve(c);
                }, revoke);
            });
        };

        return service;
    }
})();