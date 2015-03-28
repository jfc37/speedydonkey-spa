(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('classCheckInService', classCheckInService);

    classCheckInService.$inject = ['$q', '$routeParams', 'dataservice', 'dataUpdateService', 'dataDeleteService', 'logger', 'commonFunctions'];

    /* @ngInject */
    function classCheckInService($q, $routeParams, dataservice, dataUpdateService, dataDeleteService, logger, commonFunctions) {
        /*jshint validthis: true */
        
        var service = {
            getClass: getClass,
            getStudents: getStudents,
            searchUsers: searchUsers,
            attendenceStatusChanged: attendenceStatusChanged,
            enrolStudent: enrolStudent,
            getPassesForStudent: getPassesForStudent,
            purchaseNewPass: purchaseNewPass,
            passPaidFor: passPaidFor,
            getVisitor: getVisitor
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
                    attendingStudents.forEach(function (student) {
                        student.attendedClass = true;
                    });

                    registeredStudents.forEach(function (registeredStudent) {
                        if (attendingStudents.filter(function (attendingStudent) {
                            return attendingStudent.id === registeredStudent.id;
                        }).length === 0){
                            attendingStudents.push(registeredStudent);
                        }
                    });

                    resolve(attendingStudents);
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
                    },
                    {
                        field: 'orderby',
                        condition: 'fullname'
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
                    if (!student.passes.some(commonFunctions.isValidPass)) {
                        reject(student.full_name + ' needs to buy a pass before attending class');
                        student.attendedClass = false;
                        return;
                    }
                    message = {
                        success: "Recorded student's attendance",
                        error: "Issue recording student's attendance..."
                    };
                    promise = dataUpdateService.studentAttendedClass($routeParams.id, student.id);
                } else {
                    message = {
                        success: "Removed student's attendance",
                        error: "Issue removing student's attendance..."
                    };
                    promise = dataDeleteService.studentUnattendedClass($routeParams.id, student.id);
                }

                promise.then(function () {
                    getPassesForStudent(student);
                }).then(function(){
                    resolve(message.success);
                }, function() {
                    reject(message.error);
                });

            });
        }

        function enrolStudent(studentId, blockId) {
            return $q(function (resolve, revoke) {
                var enrolment = {
                    user_id: studentId,
                    block_ids: [blockId]
                };
                dataUpdateService.enrolInBlock(enrolment).then(resolve, revoke);
            });
        }

        function getPassesForStudent(student) {
            return $q(function (resolve, revoke) {
                dataservice.getUserCurrentPasses(student.id).then(function (passes) {
                    student.passes = passes;
                    resolve();
                }, function () {
                    student.passes = [];
                    resolve();
                });
            });
        }

        function purchaseNewPass(student, passType) {
            return $q(function (resolve, revoke) {
                var pass = {
                    pass_type: passType.name,
                    payment_status: 'paid'
                };
                dataUpdateService.assignPassToStudent(student.id, pass).then(function (){
                    getPassesForStudent(student).then(resolve, resolve);
                }, revoke);
            });
        }

        function passPaidFor(pass) {
            return $q(function (resolve, revoke) {
                pass.payment_status = 'paid';
                dataUpdateService.updatePass(pass).then(resolve, function () {
                    pass.payment_status = 'pending';
                    revoke();
                });
            });
        }

        function getVisitor() {
            return $q(function (resolve, revoke) {
                var search = {
                    field: 'fullname',
                    condition: '=',
                    value: 'Full Swing Visitor'
                };
                dataservice.searchForUserNew([search]).then(function (response) {
                    resolve(response.data[0]);
                }, revoke);
            });
        }

        return service;
    }
})();
