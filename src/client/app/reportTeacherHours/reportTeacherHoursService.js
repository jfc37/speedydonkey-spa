(function () {
    'use strict';

    angular
        .module('app.reportTeacherHours')
        .factory('reportTeacherHoursService', reportTeacherHoursService);

    /* @ngInject */
    function reportTeacherHoursService($q, logger, dataservice, dataUpdateService, authService) {

        var service = {
            getTeacherHours: getTeacherHours
        };

        function getTeacherHours(starting, ending) {
            return $q(function (resolve, revoke) {
                var search = [
                    {
                        field: 'startTime',
                        condition: 'gt',
                        value: starting
                    },
                    {
                        field: 'endTime',
                        condition: 'lt',
                        value: ending
                    },
                ];
                dataservice.searchForClasses(search).then(function (response) {
                    var teacherHours = [];

                    response.data.forEach(function (theClass) {
                        theClass.teachers.forEach(function (teacher) {
                            var matchingTeacher = teacherHours.getFirstOrDefault('id', teacher.id);
                            if (!matchingTeacher) {
                                matchingTeacher = {
                                    id: teacher.id,
                                    fullName: teacher.fullName,
                                    soloClasses: [],
                                    partnerClasses: []
                                };
                                teacherHours.push(matchingTeacher);
                            }

                            if (theClass.teachers.length === 1) {
                                matchingTeacher.soloClasses.push(theClass);
                            } else {
                                matchingTeacher.partnerClasses.push(theClass);
                            }
                        });
                    });

                    resolve(teacherHours);
                }, revoke);
            });
        }

        return service;

    }
})();
