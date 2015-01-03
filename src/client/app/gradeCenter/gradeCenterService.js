(function () {
    'use strict';

    angular
        .module('app.gradeCenter')
        .factory('gradeCenterService', gradeCenterService)
        .factory('gradeTypeHandlerFactory', gradeTypeHandlerFactory);

    gradeCenterService.$inject = ['$q', 'myCourseService', 'gradeTypeHandlerFactory', 'dataCreateService', 'dataservice', 'authService'];

    /* @ngInject */
    function gradeCenterService($q, myCourseService, gradeTypeHandlerFactory, dataCreateService, dataservice, authService) {
        /*jshint validthis: true */
        var service = {
            getCourseGrades: getCourseGrades,
            calculateWeightedGrade: calculateWeightedGrade,
            saveGrade: saveGrade
        };

        function getCourseGrades(courseName) {
            return $q(function (resolve, revoke) {
                myCourseService.getCourse(courseName).then(function (course) {
                    dataservice.getCourseGrade(authService.getUserIdentity().personId, course.id).then(function (courseGrade) {
                        courseGrade.course.courseWorks = course.exams.concat(course.assignments);

                        courseGrade.course_work_grades.forEach(function (grade) {
                            courseGrade.course.courseWorks.filter(function (courseWork) {
                                return courseWork.id === grade.course_work.id;
                            })[0].grade_percentage = grade.grade_percentage;
                        });

                        resolve(courseGrade);
                    }, revoke);
                }, revoke);
            });
        }

        function saveGrade(courseId, courseWork) {
            return dataCreateService.createGrade(courseId, courseWork);
        }

        function calculateWeightedGrade(courseWorks, gradeType) {
            var weightedGrade = 0;
            courseWorks.forEach(function (courseWork) {
                if (isRequiredForGradeWeightCalculation(courseWork)) {
                    var courseWorkWeighting = courseWork.grade_percentage * (courseWork.final_mark_percentage / 100);
                    weightedGrade = weightedGrade + courseWorkWeighting;
                }
            });

            var handler = gradeTypeHandlerFactory.getGradeTypeHandler(gradeType);
            return handler.getGrade(weightedGrade);
        }

        function isRequiredForGradeWeightCalculation(courseWork) {
            courseWork.grade_percentage = parseInt(courseWork.grade_percentage, 10);
            return courseWork.final_mark_percentage > 0 && courseWork.grade_percentage > -1;
        }

        return service;
    }

    function gradeTypeHandlerFactory() {
        var service = {
            getGradeTypeHandler: getGradeTypeHandler
        };

        function getGradeTypeHandler(gradeType) {
            if (gradeType.toLowerCase() === 'percentage') {
                return percentageGradeTypeHandler();
            } else if (gradeType.toLowerCase() === 'letter') {
                return letterGradeTypeHandler();
            }
        }

        return service;
    }

    function percentageGradeTypeHandler() {
        var service = {
            getGrade: getGrade
        };

        function getGrade(percentage) {
            return percentage;
        }

        return service;
    }

    function letterGradeTypeHandler() {
        var service = {
            getGrade: getGrade
        };

        function getGrade(percentage) {
            return getLetterGradeFromPercentage(percentage);
        }

        function getLetterGradeFromPercentage(percentage) {
            if (percentage < 40) {
                return 'E';
            } else if (percentage > 39 && percentage < 50) {
                return 'D';
            } else if (percentage > 49 && percentage < 55) {
                return 'C-';
            } else if (percentage > 54 && percentage < 60) {
                return 'C';
            } else if (percentage > 59 && percentage < 65) {
                return 'C+';
            } else if (percentage > 64 && percentage < 70) {
                return 'B-';
            } else if (percentage > 69 && percentage < 75) {
                return 'B';
            } else if (percentage > 74 && percentage < 80) {
                return 'B+';
            } else if (percentage > 79 && percentage < 85) {
                return 'A-';
            } else if (percentage > 84 && percentage < 90) {
                return 'A';
            } else if (percentage > 89) {
                return 'A+';
            }
        }

        return service;
    }

})();