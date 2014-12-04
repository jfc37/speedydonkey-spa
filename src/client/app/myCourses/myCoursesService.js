(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('myCoursesService', myCoursesService);

    myCoursesService.$inject = ['$q', 'logger', 'dataservice', 'authService'];

    /* @ngInject */
    function myCoursesService($q, logger, dataservice, authService){

        var service = {
            getCourses : getCourses
        };

        function getCourses() {
            return $q(function (resolve, reject) {
                dataservice.getStudent(authService.getUserIdentity().personId).then(function(student) {
                    resolve(student.enroled_courses);
                }, reject);
            });
        }

        return service;

    }
})();