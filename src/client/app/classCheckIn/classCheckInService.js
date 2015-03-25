(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('classCheckInService', classCheckInService);

    classCheckInService.$inject = ['$q', '$routeParams', 'dataservice', 'dataUpdateService', 'dataDeleteService', 'logger'];

    /* @ngInject */
    function classCheckInService($q, $routeParams, dataservice, dataUpdateService, dataDeleteService, logger) {
        /*jshint validthis: true */
        
        var service = {
            getClass: getClass,
            getStudents: getStudents,
            searchUsers: searchUsers,
            attendenceStatusChanged: attendenceStatusChanged
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

        function noop() {}

        function getStudents() {
            return $q(function (resolve, reject) {
                var registeredStudents = [];
                var attendingStudents = [];

                var registeredStudentsPromise = dataservice.getClassRegisteredStudents($routeParams.id).then(function (students) {
                    registeredStudents = students;
                });
                var attendingStudentsPromise = dataservice.getClassAttendance($routeParams.id).then(function(students) {
                    attendingStudents = students;
                });

                $q.all([registeredStudentsPromise.catch(noop), attendingStudentsPromise.catch(noop)]).then(function () {
                    registeredStudents.forEach(function (registeredStudent) {
                        if (attendingStudents.filter(function (attendingStudent) {
                            return attendingStudent.id === registeredStudent.id;
                        }).length > 0){
                            registeredStudent.attendedClass = true;
                        }
                    });

                    resolve(registeredStudents, attendingStudents);
                });
            });
        }

        function searchUsers(name) {
            return $q(function (resolve, reject) {

                var search = [
                    {
                        field: 'fullname',
                        condition: 'cont',
                        value: name
                    }
                ];

                dataservice.searchForUserNew(search).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'No students registered...';
                    }
                    reject(response);
                });
            });
        }

        function attendenceStatusChanged(student) {
            return $q(function(resolve, reject) {
                var promise;
                var message;
                if (student.attendedClass) {
                    message = {
                        success: "Recorded student's attendance",
                        error: "Issue recording student's attendance..."
                    };
                    promise = dataUpdateService.studentAttendedClass($routeParams.id, student.id);
                } else {
                    message = {
                        success: "Reomved student's attendance",
                        error: "Issue removing student's attendance..."
                    };
                    promise = dataDeleteService.studentUnattendedClass($routeParams.id, student.id);
                }

                promise.then(function(){
                    resolve(message.success);
                }, function() {
                    reject(message.error);
                });

            });
        }

        return service;
    }
})();
