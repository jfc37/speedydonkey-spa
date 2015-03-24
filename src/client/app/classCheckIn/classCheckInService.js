(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('classCheckInService', classCheckInService);

    classCheckInService.$inject = ['$q', '$routeParams', 'dataservice', 'logger'];

    /* @ngInject */
    function classCheckInService($q, $routeParams, dataservice, logger) {
        /*jshint validthis: true */
        
        var service = {
            getClass: getClass,
            getRegisteredStudents: getRegisteredStudents
        };

        function getClass() {
            return $q(function (resolve, reject) {
                dataservice.getClass($routeParams.id).then(function (theClass) {
                    resolve(theClass);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'Class does not exist...';
                    }
                    reject(response);
                });
            });
        }

        function getRegisteredStudents() {
            return $q(function (resolve, reject) {
                dataservice.getClassRegisteredStudents($routeParams.id).then(function (students) {
                    resolve(students);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'No students registered...';
                    }
                    reject(response);
                });
            });
        }

        return service;
    }
})();
