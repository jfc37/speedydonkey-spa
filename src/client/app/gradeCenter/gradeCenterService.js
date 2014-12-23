(function () {
    'use strict';

    angular
        .module('app.gradeCenter')
        .factory('gradeCenterService', gradeCenterService);

    gradeCenterService.$inject = ['myCourseService'];

    /* @ngInject */
    function gradeCenterService(myCourseService) {
        /*jshint validthis: true */
        var service = {
            getCourse: getCourse
        };

        function getCourse(courseName) {
            return myCourseService.getCourse(courseName);
        }

        return service;
    }
})();