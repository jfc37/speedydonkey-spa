(function () {
    'use strict';

    angular
        .module('app.gradeCenter')
        .factory('gradeCenterService', gradeCenterService)
        .factory('gradeTypeHandlerFactory', gradeTypeHandlerFactory);

    gradeCenterService.$inject = ['myCourseService', 'gradeTypeHandlerFactory'];

    /* @ngInject */
    function gradeCenterService(myCourseService, gradeTypeHandlerFactory) {
        /*jshint validthis: true */
        var service = {
            getCourse: getCourse,
            calculateWeightedGrade: calculateWeightedGrade,
            saveGrade: saveGrade
        };

        function getCourse(courseName) {
            return myCourseService.getCourse(courseName);
        }

        function saveGrade(courseWork) {
            
        }

        function calculateWeightedGrade(courseWorks, gradeType) {
            var weightedGrade = 0;
            courseWorks.forEach(function (courseWork) {
                if (isRequiredForGradeWeightCalculation(courseWork)) {
                    var courseWorkWeighting = courseWork.grade * (courseWork.final_mark_percentage / 100);
                    weightedGrade = weightedGrade + courseWorkWeighting;
                }
            });

            var handler = gradeTypeHandlerFactory.getGradeTypeHandler(gradeType);
            return handler.getGrade(weightedGrade);
        }

        function isRequiredForGradeWeightCalculation(courseWork) {
            courseWork.grade = parseInt(courseWork.grade, 10);
            return courseWork.final_mark_percentage > 0 && courseWork.grade > -1;
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