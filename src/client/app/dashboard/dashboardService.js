(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('dashboardService', dashboardService);

    dashboardService.$inject = ['$q', 'dataservice', 'logger', 'authService'];

    /* @ngInject */
    function dashboardService($q, dataservice, logger, authService) {
        /*jshint validthis: true */
        
        var service = {
            loadEnroledCourses: loadEnroledCourses,
            getCourseNotices: getCourseNotices,
            getUpcomingLectures: getUpcomingLectures,
            getUpcomingDeadlines: getUpcomingDeadlines
        };

        var loadedCourses = [];
        var loadedStudent = {};

        function loadEnroledCourses() {
            return $q(function (resolve, revoke) {
                var promises = [];
                getStudent().then(function (student) {
                    loadedStudent = student;
                    student.enroled_courses.forEach(function (course) {
                        promises.push(dataservice.getCourse(course.id).then(function (course) {
                            loadedCourses.push(course);
                        }));
                    });
                    $q.all(promises).then(function () {
                        resolve(loadedCourses);
                    }, function () {
                        resolve(loadedCourses);
                    });
                }, revoke);
            });
        }

        function getStudent() {
            return $q(function (resolve, reject) {
                dataservice.getStudent(authService.getUserIdentity().personId).then(function(student) {
                    resolve(student);
                }, reject);
            });
        }

        function getCourseNotices() {
            var courseNotices = [];
            loadedCourses.forEach(function (course) {
                course.notices.forEach(function (notice) {
                    notice.courseName = course.name;
                });
                Array.prototype.push.apply(courseNotices, course.notices);
            });
            return $q.when(courseNotices);
        }

        function getUpcomingLectures() {
            var lectures = [];
            loadedCourses.forEach(function (course) {
                course.lectures.forEach(function (lecture) {
                    lecture.courseName = course.name;
                });
                Array.prototype.push.apply(lectures, course.lectures);
            });
            return $q.when(lectures);
        }

        function getUpcomingDeadlines() {
            var deadlines = [];
            loadedCourses.forEach(function (course) {
                course.exams.forEach(function (exam) {
                    exam.courseName = course.name;
                    exam.due_date = exam.start_time;
                });
                course.assignments.forEach(function (assignment) {
                    assignment.courseName = course.name;
                    assignment.due_date = assignment.end_date;
                });
                Array.prototype.push.apply(deadlines, course.exams);
                Array.prototype.push.apply(deadlines, course.assignments);
            });
            return $q.when(deadlines);
        }

        return service;
    }
})();
