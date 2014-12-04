(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q', '$http', 'apiCaller'];

    /* @ngInject */
    function dataservice($q, $http, apiCaller) {
        var service = {
            getCourseNotices: getCourseNotices,
            getUpcomingDeadlines: getUpcomingDeadlines,
            getUpcomingLectures: getUpcomingLectures,
            getRecentGrades: getRecentGrades,
            getCourses: getCourses,
            getCourse: getCourse,

            getAllCourses: getAllCourses,

            searchForUser: searchForUser,

            getStudent: getStudent,

            searchForCourse: searchForCourse,
        };

        return service;

        function getCourseNotices() {
            var courseNotices = [
                { message: 'Mondays class is cancelled', course: { name: 'INFO101' } },
                { message: 'Reminder that the first essay is due next week', course: { name: 'ENGL111' } }
            ];
            return $q.when(courseNotices);
        }

        function getUpcomingDeadlines() {
            var upcomingDeadlines = [
                { name: 'Assignment 1', course: { name: 'INFO101' }, type: 'assignment', end_date: '02/11/14', final_mark_percentage: 20 },
                { name: 'Grammer History Essay', course: { name: 'ENGL111' }, type: 'assignment', end_date: '05/11/14', final_mark_percentage: 5 },
                { name: 'Midterm Test', course: { name: 'COMP103' }, type: 'exam', start_time: '06/11/14', final_mark_percentage: 50 },
                { name: 'Practice Essay', course: { name: 'ENGL111' }, type: 'assignment', end_date: '08/11/14', final_mark_percentage: 0 }
            ];
            return $q.when(upcomingDeadlines);
        }

        function getUpcomingLectures() {
            var upcomingLectures = [
                { course: { name: 'COMP103' }, location: 'KIRK201', start_date: '10:05, Monday 6th of November' },
                { course: { name: 'INFO101' }, location: 'MURP303', start_date: '12:05, Tuesday 7th of November' },
                { course: { name: 'ENGL111' }, location: 'GRIP433', start_date: '16:35, Thursday 9th of November' },
                { course: { name: 'COMP103' }, location: 'KIRK201', start_date: '10:05, Monday 13th of November' },
            ];
            return $q.when(upcomingLectures);
        }

        function getRecentGrades() {
            var recentGrades = [
                { courseName: 'COMP103', courseWorkName: 'Assignment 1', gradePercentage: 'A-' },
                { courseName: 'COMP103', courseWorkName: 'Assignment 2', gradePercentage: 'B' },
                { courseName: 'ENGL111', courseWorkName: 'Mock Exam', gradePercentage: '67%' },
            ];
            return $q.when(recentGrades);
        }

        function getCourses() {
            var courses = [
            { name: 'INFO101', description: 'Introduction to information studies'},
            { name: 'COMP103', description: 'Introduction to computer science'},
            { name: 'ENGL111', description: 'Learn to read'},
            { name: 'MATH102', description: 'Introduction to discrete maths'},
            ];
            return $q.when(courses);
        }

        function getCourse(courseId, success, error) {
            apiCaller.getCourse(courseId)
                .success(success)
                .error(error);
        }

        function getAllCourses() {
            return $q(function (resolve, reject) {
                apiCaller.getCourse().then(function (response) {
                    resolve(response.data);   
                }, function (response) {
                    reject(response);
                });
            })
        }

        function searchForCourse(searchParameters, success, error) {

            var q = '';
            for (var prop in searchParameters) {
                if (searchParameters.hasOwnProperty(prop)) {
                    q = q + '&' + prop + '_=_' + searchParameters[prop];
                }
            }
            q = q.slice(1);

            return $q(function (resolve, revoke) {
                apiCaller.searchCourse(q).then(function (response){
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