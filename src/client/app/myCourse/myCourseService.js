(function () {
    'use strict';

    angular
        .module('app.myCourse')
        .factory('myCourseService', myCourseService);

    myCourseService.$inject = ['$q', '$routeParams', 'dataservice', 'logger', 'routehelper'];

    /* @ngInject */
    function myCourseService($q, $routeParams, dataservice, logger, routehelper) {
        /*jshint validthis: true */
        var service = {
            getCourse: getCourse
        };

        function getCourse() {
            return $q(function (resolve, revoke) {
                dataservice.searchForCourse({name: $routeParams.courseName}).then(function (courses) {
                    if (courses.length === 1) {
                        var loadedCourse;
                        var promise = dataservice.getCourse(courses[0].id).then(function (course) {
                            loadedCourse = course;
                        });

                        $q.when(promise).then(function () {
                            resolve(loadedCourse);
                        });
                    }
                });
            });
        }

        return service;
    }
})();