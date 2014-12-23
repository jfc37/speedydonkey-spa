(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q', 'apiCaller', 'dateService'];

    /* @ngInject */
    function dataservice($q, apiCaller, dateService) {
        var service = {

            getAllCourses: getAllCourses,
            getCourse: getCourse,
            searchForCourse: searchForCourse,

            searchForUser: searchForUser,

            getStudent: getStudent,
        };

        return service;

        function getCourse(courseId) {
            
            return $q(function (resolve, revoke) {
                apiCaller.getCourse(courseId).then(function (response) {
                    resolve(response.data);
                }, revoke);
            });
        }

        function getAllCourses() {
            return $q(function (resolve, reject) {
                apiCaller.getCourse().then(function (response) {
                    resolve(response.data);   
                }, function (response) {
                    reject(response);
                });
            });
        }

        function searchForCourse(searchParameters, includeParameters) {

            var q = '';
            for (var prop in searchParameters) {
                if (searchParameters.hasOwnProperty(prop)) {
                    q = q + '&' + prop + '_=_' + searchParameters[prop];
                }
            }
            for (var includeProp in includeParameters) {
                if (includeParameters.hasOwnProperty(includeProp)) {
                    q = q + ',include_' + includeProp;
                }
            }
            q = q.slice(1);

            return $q(function (resolve, revoke) {
                apiCaller.searchCourse(q).then(function (response) {
                    response.data.forEach(function (course) {
                        course = dateService.convertStringsToDates(course);
                    });
                    resolve(response.data);
                }, revoke);
            });
        }

        function searchForUser(searchParameters) {

            var q = '';
            for (var prop in searchParameters) {
                if (searchParameters.hasOwnProperty(prop)) {
                    q = q + '&' + prop + '_=_' + searchParameters[prop];
                }
            }
            q = q.slice(1);

            return apiCaller.searchUser(q);
        }

        function getStudent(studentId) {
            return $q(function (resolve, reject) {
                apiCaller.getPerson({role: 'student', personId: studentId}).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }
    }
})();